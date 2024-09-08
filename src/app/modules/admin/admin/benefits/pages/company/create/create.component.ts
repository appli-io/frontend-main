import { Component }                                            from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators }         from '@angular/forms';
import { PageDetailHeaderComponent }                            from '@modules/shared/components/page-detail-header/page-detail-header.component';
import { TranslocoDirective, TranslocoPipe }                    from '@ngneat/transloco';
import { SIMPLE_QUILL_EDITOR_MODULES }                          from '@core/constants';
import { MatAutocompleteTrigger, MatOption }                    from '@angular/material/autocomplete';
import { MatButton, MatIconButton }                             from '@angular/material/button';
import { MatDivider }                                           from '@angular/material/divider';
import { MatError, MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon }                                              from '@angular/material/icon';
import { MatInput }                                             from '@angular/material/input';
import { MatSelect }                                            from '@angular/material/select';
import { NgForOf }                                              from '@angular/common';
import { QuillEditorComponent }                                 from 'ngx-quill';
import { AbstractCreateComponent }                              from '@modules/shared/components/abstracts/abstract-create.component';
import { BenefitCompany }                                       from '@modules/admin/admin/benefits/models/benefit-company';
import { BenefitCompanyService }                                from '@modules/admin/admin/benefits/services/benefit-company.service';

@Component({
  selector   : 'app-create',
  standalone : true,
  imports: [
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
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html'
})
export class CreateComponent extends AbstractCreateComponent<BenefitCompany> {
  protected readonly quillModules = SIMPLE_QUILL_EDITOR_MODULES;

  constructor(
    private readonly _benefitCompanyService: BenefitCompanyService,
  ) {
    super(_benefitCompanyService);
  }

  initForm() {
    this.form = this.formBuilder.group({
      description: [ null, [ Validators.required, Validators.minLength(3) ] ],
      name       : [ null, [ Validators.required, Validators.minLength(3) ] ],
      image      : [ null, [ Validators.required ] ],
    });
  }
}
