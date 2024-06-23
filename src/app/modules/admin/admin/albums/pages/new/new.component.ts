import { Component, OnInit }                                                     from '@angular/core';
import { JsonPipe, NgIf }                                                        from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButton, MatIconButton }                                              from '@angular/material/button';
import { MatChipRemove, MatChipRow }                                             from '@angular/material/chips';
import { MatDialogRef }                                                          from '@angular/material/dialog';
import { MatFormField, MatLabel, MatSuffix }                                     from '@angular/material/form-field';
import { MatIcon }                                                               from '@angular/material/icon';
import { MatInput }                                                              from '@angular/material/input';

import { DropzoneCdkModule, FileInputValidators } from '@ngx-dropzone/cdk';
import { DropzoneMaterialModule }                 from '@ngx-dropzone/material';
import { AlbumsService }                          from '@modules/admin/admin/albums/albums.service';
import { MatProgressSpinner }                     from '@angular/material/progress-spinner';
import { takeUntil }                              from 'rxjs';
import { TranslocoDirective }                     from '@ngneat/transloco';
import { CdkTextareaAutosize }                    from '@angular/cdk/text-field';
import { ImageUploadPreviewComponent }            from '@modules/admin/admin/albums/components/image-upload-preview/image-upload-preview.component';
import { IAlbum }                                 from '@modules/admin/apps/albums/interfaces/album.interface';

@Component({
  selector   : 'app-new',
  standalone : true,
  imports: [
    MatIconButton,
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    JsonPipe,
    DropzoneMaterialModule,
    MatChipRemove,
    MatChipRow,
    DropzoneCdkModule,
    MatSuffix,
    MatProgressSpinner,
    NgIf,
    TranslocoDirective,
    CdkTextareaAutosize,
    ImageUploadPreviewComponent
  ],
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  albumForm: UntypedFormGroup;

  constructor(
    public readonly _matDialogRef: MatDialogRef<NewComponent>,
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _albumsService: AlbumsService
  ) {}

  protected readonly URL = URL;

  ngOnInit(): void {
    this.albumForm = this._formBuilder.group({
      name : [ undefined, [ Validators.required, Validators.minLength(3), Validators.maxLength(255) ] ],
      description: [ undefined, [ Validators.required, Validators.minLength(3) ] ],
      cover: [ undefined, [ Validators.required, FileInputValidators.accept('image/*') ] ]
    });
  }

  discard(): void {
    this._matDialogRef.close();
  }

  save(): void {
    if (this.albumForm.valid) {
      this.albumForm.disable();
      this._albumsService.postAlbum(this.albumForm.getRawValue())
        .pipe(takeUntil(this._matDialogRef.afterClosed()))
        .subscribe({
            next : (result) => {
              console.log('Album created', result);
              this._matDialogRef.close();
            },
            error: (error) => {
              console.error('Error creating album', error);
              this.albumForm.enable();
            }
          }
        );
      // this._matDialogRef.close(this.albumForm.value);
    }
  }

  remove(file: any) {
    console.log('Remove file', file);
    this.albumForm.get('cover').setValue(undefined);
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.albumForm.patchValue({cover: files});
    }
  }

  removeFile(file: File) {
    const files = this.albumForm.get('cover')?.value as File[];
    const index = files.indexOf(file);
    if (index >= 0) {
      files.splice(index, 1);
      this.albumForm.patchValue({cover: files});
    }
  }

  uploadFile(file: File) {
    const component = this; // Save reference to this
    this._albumsService.addImageToAlbum('', file).subscribe({
      next(response: {
        progress: number, response?: IAlbum
      }) {
        const preview = component.getPreviewComponent(file);
        preview?.setUploadProgress(response.progress);
      },
      error(err) {
        console.error('Error uploading file:', err);
        // Handle retry logic here
      }
    });
  }

  uploadAll() {
    const files = this.albumForm.get('cover')?.value as File[];
    files.forEach(file => this.uploadFile(file));
  }

  getPreviewComponent(file: File): ImageUploadPreviewComponent | undefined {
    const previews = document.querySelectorAll('app-image-preview');
    for (let i = 0; i < previews.length; i++) {
      const preview = previews[i] as any as ImageUploadPreviewComponent;
      if (preview.file === file) {
        return preview;
      }
    }
    return undefined;
  }
}
