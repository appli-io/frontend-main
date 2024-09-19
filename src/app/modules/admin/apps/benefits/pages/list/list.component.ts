import { Component }                         from '@angular/core';
import { MatIcon }                           from '@angular/material/icon';
import { MatIconAnchor }                     from '@angular/material/button';
import { MatTooltip }                        from '@angular/material/tooltip';
import { RouterLink }                        from '@angular/router';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';

import { PageHeaderComponent }                        from '@layout/components/page-header/page-header.component';
import { BenefitCategoryService }                     from '@modules/admin/admin/benefits/services/benefit-category.service';
import { BenefitCategoryCardComponent }               from '@modules/admin/apps/benefits/components/benefit-category-card/benefit-category-card.component';
import { AsyncPipe }                                  from '@angular/common';
import { MatError, MatFormField, MatHint, MatPrefix } from '@angular/material/form-field';
import { MatInput }                                   from '@angular/material/input';
import { ReactiveFormsModule, UntypedFormControl }    from '@angular/forms';
import { BenefitCategoriesListComponent }             from '@modules/admin/apps/benefits/components/benefit-categories-list/benefit-categories-list.component';

@Component({
  selector   : 'app-list',
  standalone : true,
  imports: [
    PageHeaderComponent,
    TranslocoDirective,
    MatIcon,
    MatIconAnchor,
    TranslocoPipe,
    MatTooltip,
    BenefitCategoryCardComponent,
    RouterLink,
    AsyncPipe,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatPrefix,
    ReactiveFormsModule,
    BenefitCategoriesListComponent
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {
  public categories$ = this._benefitCategoryService.categories$;
  public searchControl: UntypedFormControl = new UntypedFormControl('');

  constructor(private readonly _benefitCategoryService: BenefitCategoryService) {}
}
