import { Component, OnInit }                                                     from '@angular/core';
import { JsonPipe, NgIf }                                                        from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButton, MatIconButton }                                              from '@angular/material/button';
import { MatChipRemove, MatChipRow }                                             from '@angular/material/chips';
import { MatDialogRef }                                                          from '@angular/material/dialog';
import { MatFormField, MatLabel, MatSuffix }                                     from '@angular/material/form-field';
import { MatIcon }                                                               from '@angular/material/icon';
import { MatInput }                                                              from '@angular/material/input';

import { DropzoneCdkModule }      from '@ngx-dropzone/cdk';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';
import { AlbumsService }          from '@modules/admin/admin/albums/albums.service';
import { MatProgressSpinner }     from '@angular/material/progress-spinner';
import { takeUntil }              from 'rxjs';
import { TranslocoDirective }     from '@ngneat/transloco';

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
    TranslocoDirective
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

  ngOnInit(): void {
    this.albumForm = this._formBuilder.group({
      name       : [ undefined, [ Validators.required, Validators.minLength(3) ] ],
      description: [ undefined, [ Validators.required, Validators.minLength(3) ] ],
      cover      : [ undefined, [ Validators.required ] ],
    });
  }

  save(): void {
    if (this.albumForm.valid) {
      this.albumForm.disable();
      this._albumsService.postAlbum(this.albumForm.getRawValue())
        .pipe(takeUntil(this._matDialogRef.afterClosed()))
        .subscribe(result => {
          console.log('Album created', result);
          this._matDialogRef.close();
        });
      // this._matDialogRef.close(this.albumForm.value);
    }
  }

  discard(): void {
    this._matDialogRef.close();
  }

  remove(file: any) {
    console.log('Remove file', file);
  }
}
