import { Component }                                                                          from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButton, MatIconButton }                                                           from '@angular/material/button';
import { MatFormField, MatLabel, MatPrefix }                                                  from '@angular/material/form-field';
import { MatIcon }                                                                            from '@angular/material/icon';
import { MatInput }                                                                           from '@angular/material/input';
import { MatTooltip }                                                                         from '@angular/material/tooltip';
import { PageHeaderComponent }                                                                from '@layout/components/page-header/page-header.component';
import { TranslocoDirective }                                                                 from '@ngneat/transloco';
import { trackByFn }                                                                          from '@libs/ui/utils/utils';

@Component({
    selector   : 'app-create',
    standalone : true,
    imports    : [
        FormsModule,
        MatButton,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatPrefix,
        MatTooltip,
        PageHeaderComponent,
        TranslocoDirective,
        ReactiveFormsModule
    ],
    templateUrl: './create.component.html'
})
export class CreateComponent {
    form: UntypedFormGroup;

    protected readonly trackByFn = trackByFn;

    constructor(
        private readonly _fb: UntypedFormBuilder
    ) {
        this.form = this._fb.group({
            name       : [ undefined, Validators.required ],
            description: [ undefined ],
        });
    }
}
