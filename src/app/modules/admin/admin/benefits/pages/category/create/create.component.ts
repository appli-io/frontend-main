import { Component, OnInit }                                                                  from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PageDetailHeaderComponent }                                                          from '@modules/shared/components/page-detail-header/page-detail-header.component';
import { TranslocoDirective, TranslocoPipe }                                                  from '@ngneat/transloco';
import { MatAutocompleteTrigger, MatOption }                                                  from '@angular/material/autocomplete';
import { MatButton, MatIconButton }                                                           from '@angular/material/button';
import { MatDivider }                                                                         from '@angular/material/divider';
import { MatError, MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix }                    from '@angular/material/form-field';
import { MatIcon }                                                                            from '@angular/material/icon';
import { MatInput }                                                                           from '@angular/material/input';
import { MatSelect }                                                                          from '@angular/material/select';
import { AsyncPipe, JsonPipe, NgForOf }                                                       from '@angular/common';
import { QuillEditorComponent }                                                               from 'ngx-quill';
import { SIMPLE_QUILL_EDITOR_MODULES }                                                        from '@core/constants';
import { BenefitCategorySelector }                                                            from '@modules/shared/selectors/components/benefit-categories-selector/benefit-category-selector.component';
import { BenefitCategoryService }                                                             from '@modules/admin/admin/benefits/services/benefit-category.service';
import { MatProgressSpinner }                                                                 from '@angular/material/progress-spinner';
import { fuseAnimations }                                                                     from '../../../../../../../../@fuse/animations';

@Component({
  selector   : 'app-create',
  standalone : true,
  imports    : [
    FormsModule,
    PageDetailHeaderComponent,
    TranslocoDirective,
    TranslocoPipe,
    MatAutocompleteTrigger,
    MatButton,
    MatDivider,
    MatError,
    MatFormField,
    MatHint,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgForOf,
    QuillEditorComponent,
    ReactiveFormsModule,
    BenefitCategorySelector,
    JsonPipe,
    MatProgressSpinner,
    MatPrefix,
    AsyncPipe
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
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name       : [ null, [ Validators.required, Validators.minLength(3) ] ],
      description: [ null, [ Validators.required, Validators.minLength(10) ] ],
      icon       : [ null, [ Validators.required ] ],
      image      : [ null ],
      parent     : [ null ]
    });
  }

  public submit(): void {
    if (this.form.invalid) this.form.markAllAsTouched();

    this.form.disable();
    this._benefitCategoryService.create(this.form.getRawValue());
  }
}
