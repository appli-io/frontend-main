import { Component }                                                             from '@angular/core';
import { PageHeaderComponent }                                                   from '@layout/components/page-header/page-header.component';
import { TranslocoDirective, TranslocoPipe, TranslocoService }                   from '@ngneat/transloco';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService }                                                           from '@modules/admin/user/user.service';
import { FuseValidators }                                                        from '../../../../../../../@fuse/validators';
import { MatFormFieldModule }                                                    from '@angular/material/form-field';
import { MatInput }                                                              from '@angular/material/input';
import { MatIcon }                                                               from '@angular/material/icon';
import { MatButton, MatIconButton }                                              from '@angular/material/button';
import { MatProgressSpinner }                                                    from '@angular/material/progress-spinner';

@Component({
    selector   : 'app-pasword-update',
    standalone : true,
    imports    : [
        ReactiveFormsModule,
        MatFormFieldModule,
        PageHeaderComponent,
        TranslocoDirective,
        MatInput,
        TranslocoPipe,
        MatIcon,
        MatIconButton,
        MatButton,
        MatProgressSpinner
    ],
    templateUrl: './password-update.component.html'
})
export class PasswordUpdateComponent {
    public form: UntypedFormGroup;

    constructor(
        private readonly _fb: UntypedFormBuilder,
        private readonly _userService: UserService,
        private readonly _ts: TranslocoService,
    ) {
        this.form = this._buildForm();
    }

    public submit() {
        return;
    }

    private _buildForm() {
        return this._fb.group({
            currentPassword: [ undefined, Validators.required ],
            newPassword    : [ undefined, Validators.required ],
            confirmPassword: [ undefined, Validators.required ],
        }, {
            validators: FuseValidators.mustMatch(
                'newPassword',
                'confirmPassword'
            ),
        });
    }
}
