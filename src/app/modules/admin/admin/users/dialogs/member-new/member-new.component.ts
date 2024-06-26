import { CdkTextareaAutosize }                                                                from '@angular/cdk/text-field';
import { JsonPipe, NgIf, TitleCasePipe }                                                      from '@angular/common';
import { Component, OnInit }                                                                  from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButton, MatIconButton }                                                           from '@angular/material/button';
import { MatCard }                                                                            from '@angular/material/card';
import { MatChipRemove, MatChipRow }                                                          from '@angular/material/chips';
import { MatOption }                                                                          from '@angular/material/core';
import { MatDialogRef }                                                                       from '@angular/material/dialog';
import { MatFormField, MatLabel, MatSuffix }                                                  from '@angular/material/form-field';
import { MatIcon }                                                                            from '@angular/material/icon';
import { MatInput }                                                                           from '@angular/material/input';
import { MatProgressSpinner }                                                                 from '@angular/material/progress-spinner';
import { MatSelect, MatSelectTrigger }                                                        from '@angular/material/select';

import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { DropzoneCdkModule }                    from '@ngx-dropzone/cdk';
import { DropzoneMaterialModule }               from '@ngx-dropzone/material';
import { Notyf }                                from 'notyf';
import { take }                                 from 'rxjs';

import { rolesList }                   from '@core/constants';
import { ImageUploadPreviewComponent } from '@modules/admin/admin/albums/components/image-upload-preview/image-upload-preview.component';
import { UsersService }                from '@modules/admin/admin/users/users.service';

@Component({
  selector   : 'app-member-new',
  standalone : true,
  imports    : [
    CdkTextareaAutosize,
    DropzoneCdkModule,
    DropzoneMaterialModule,
    FormsModule,
    ImageUploadPreviewComponent,
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
    MatOption,
    MatSelect,
    MatSelectTrigger,
    TitleCasePipe,
    JsonPipe
  ],
  templateUrl: './member-new.component.html'
})
export class MemberNewComponent implements OnInit {
  memberForm: UntypedFormGroup;
  roles: any[];
  private _notyf = new Notyf();

  constructor(
    public readonly _matDialogRef: MatDialogRef<MemberNewComponent>,
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _translateService: TranslocoService,
    private readonly _usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.roles = rolesList;
    this.memberForm = this._formBuilder.group({
      email            : [ '', Validators.required ],
      invitationMessage: [ undefined, [ Validators.required ] ],
      role             : [ rolesList.find((role) => role.value === 'admin').value, [ Validators.required ] ],
    });
  }

  save() {
    if (this.memberForm.invalid) {
      return;
    }

    this._usersService
      .sendMemberInvitation(this.memberForm.getRawValue()).pipe(take(1))
      .subscribe({
        next : () => {
          this._notyf.success('Invitation sent successfully');
          this._matDialogRef.close();
        },
        error: (error) => {
          this._notyf.error(error.message);
        }
      });
  }
}
