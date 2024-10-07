import { Component }                                                 from '@angular/core';
import { TranslocoDirective }                                        from '@ngneat/transloco';
import { PageHeaderComponent }                                       from '@layout/components/page-header/page-header.component';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatFormFieldModule }                                        from '@angular/material/form-field';
import { MatInput }                                                  from '@angular/material/input';
import { CdkTextareaAutosize }                                       from '@angular/cdk/text-field';

@Component({
    selector   : 'app-information',
    standalone : true,
    imports    : [
        TranslocoDirective,
        PageHeaderComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInput,
        CdkTextareaAutosize
    ],
    templateUrl: './information.component.html'
})
export class InformationComponent {
    boardInfoForm: UntypedFormGroup;

    constructor(
        private readonly _fb: UntypedFormBuilder
    ) {
        this._buildForm();
    }

    private _buildForm() {
        this.boardInfoForm = this._fb.group({
            name       : [ '' ],
            description: [ '' ],
            icon       : [ '' ]
        });
    }
}
