import { Component, OnInit }                                                     from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PageDetailHeaderComponent }                                             from '../../../../../../../shared/components/page-detail-header/page-detail-header.component';
import { TranslocoDirective, TranslocoPipe }                                     from '@ngneat/transloco';
import { MatButton }                                                             from '@angular/material/button';
import { MatError, MatFormField, MatHint, MatLabel }                             from '@angular/material/form-field';
import { MatIcon }                                                               from '@angular/material/icon';
import { MatInput }                                                              from '@angular/material/input';
import { QuillEditorComponent }                                                  from 'ngx-quill';
import { SIMPLE_QUILL_EDITOR_MODULES }                                           from '@core/constants';
import { BenefitCategorySelector }                                               from '../../../../../../../shared/selectors/components/benefit-categories-selector/benefit-category-selector.component';
import { BenefitCategoryService }                                                from '@modules/admin/admin/benefits/services/benefit-category.service';
import { MatProgressSpinner }                                                    from '@angular/material/progress-spinner';
import { fuseAnimations }                                                        from '../../../../../../../../@fuse/animations';
import { lastValueFrom }                                                         from 'rxjs';
import { Router }                                                                from '@angular/router';

@Component({
    selector   : 'app-create',
    standalone : true,
    imports    : [
        PageDetailHeaderComponent,
        TranslocoDirective,
        TranslocoPipe,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        QuillEditorComponent,
        MatError,
        MatHint,
        BenefitCategorySelector,
        MatButton,
        MatProgressSpinner,
        MatInput,
        MatIcon
    ],
    templateUrl: './create.component.html',
    animations : fuseAnimations,
})
export class CreateComponent implements OnInit {
    public form: UntypedFormGroup;
    protected readonly quillModules = SIMPLE_QUILL_EDITOR_MODULES;

    constructor(
        private readonly _formBuilder: UntypedFormBuilder,
        private readonly _benefitCategoryService: BenefitCategoryService,
        private readonly _router: Router
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            name       : [ undefined, [ Validators.required, Validators.minLength(3) ] ],
            description: [ undefined, [ Validators.required, Validators.minLength(10) ] ],
            icon       : [ undefined, [ Validators.required ] ],
            image      : [ undefined, [ Validators.required ] ],
            parent     : [ undefined ]
        });
    }

    public submit(): void {
        if (this.form.invalid) this.form.markAllAsTouched();

        this.form.disable();
        lastValueFrom(this._benefitCategoryService.create(this.form.getRawValue()))
            .then(() => {
                this.form.enable();
                this.form.reset();
                this._router.navigate([ '/admin/benefits/category' ]);
            })
            .catch(() => this.form.enable());
    }

    public onFileChange(event: Event, controlName: 'icon' | 'image'): void {
        const target = event.target as HTMLInputElement;
        const file = target.files?.item(0);

        if (!file) return;

        this.form.patchValue({[controlName]: file});
    }
}
