import { Component }                                                                          from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButton, MatIconButton }                                                           from '@angular/material/button';
import { MatFormFieldModule, MatLabel, MatPrefix }                                            from '@angular/material/form-field';
import { MatIcon }                                                                            from '@angular/material/icon';
import { MatInput }                                                                           from '@angular/material/input';
import { MatTooltip }                                                                         from '@angular/material/tooltip';
import { PageHeaderComponent }                                                                from '@layout/components/page-header/page-header.component';
import { TranslocoDirective, TranslocoPipe }                                                  from '@ngneat/transloco';
import { trackByFn }                                                                          from '@libs/ui/utils/utils';
import { CdkTextareaAutosize }                                                                from '@angular/cdk/text-field';
import { JsonPipe }                                                                           from '@angular/common';

@Component({
    selector   : 'app-create',
    standalone : true,
    imports    : [
        FormsModule,
        MatButton,
        MatFormFieldModule,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatPrefix,
        MatTooltip,
        PageHeaderComponent,
        TranslocoDirective,
        ReactiveFormsModule,
        CdkTextareaAutosize,
        TranslocoPipe,
        JsonPipe
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
            description: [ undefined, Validators.required, Validators.minLength(10) ],
        });
    }

    create() {
        if (this.form.invalid) return;
    }
}
