import { Component, OnInit } from "@angular/core";
import { JsonPipe, NgIf } from "@angular/common";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatChipRemove, MatChipRow } from "@angular/material/chips";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";

import { DropzoneCdkModule, FileInputValidators } from "@ngx-dropzone/cdk";
import { DropzoneMaterialModule } from "@ngx-dropzone/material";
import { AlbumsService } from "@modules/admin/admin/albums/albums.service";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { takeUntil } from "rxjs";
import { TranslocoDirective, TranslocoService } from "@ngneat/transloco";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { ImageUploadPreviewComponent } from "@modules/admin/admin/albums/components/image-upload-preview/image-upload-preview.component";
import { MatCard } from "@angular/material/card";
import { Notyf } from "notyf";

@Component({
  selector: "app-new",
  standalone: true,
  imports: [
    CdkTextareaAutosize,
    DropzoneCdkModule,
    DropzoneMaterialModule,
    ImageUploadPreviewComponent,
    JsonPipe,
    MatButton,
    MatCard,
    MatChipRemove,
    MatChipRow,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatProgressSpinner,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    TranslocoDirective,
  ],
  templateUrl: "./new.component.html",
})
export class NewComponent implements OnInit {
  albumForm: UntypedFormGroup;
  notyf = new Notyf();

  constructor(
    public readonly _matDialogRef: MatDialogRef<NewComponent>,
    private readonly _translocoService: TranslocoService,
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.albumForm = this._formBuilder.group({
      name: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: [undefined, [Validators.required, Validators.minLength(3)]],
      cover: [undefined, [Validators.required, FileInputValidators.accept("image/*")]],
    });
  }

  discard(): void {
    this._matDialogRef.close();
  }

  save(): void {
    if (this.albumForm.valid) {
      this.albumForm.disable();

      try {
        this._albumsService
          .postAlbum(this.albumForm.getRawValue())
          .pipe(takeUntil(this._matDialogRef.afterClosed()))
          .subscribe({
            next: (result) => {
              this._matDialogRef.close();
            },
            error: (error) => {
              this.notyf.error({
                message: this._translocoService.translate("errors.service.message"),
                position: { x: "right", y: "top" },
              });
              this.albumForm.enable();
            },
          });
      } catch (error) {
        this.notyf.error({
          message: this._translocoService.translate("errors.runtime.message"),
          position: { x: "right", y: "top" },
        });
        this.albumForm.enable();
      }
    }
  }

  remove() {
    this.albumForm.get("cover").setValue(undefined);
  }
}
