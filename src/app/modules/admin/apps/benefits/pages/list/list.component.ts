import { Component }                         from '@angular/core';
import { MatIcon }                           from '@angular/material/icon';
import { MatIconAnchor }                     from '@angular/material/button';
import { MatTooltip }                        from '@angular/material/tooltip';
import { RouterLink }                        from '@angular/router';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { lastValueFrom }                     from 'rxjs';

import { PageHeaderComponent }          from '@layout/components/page-header/page-header.component';
import { BenefitCategoryService }       from '@modules/admin/admin/benefits/services/benefit-category.service';
import { BenefitCategoryCardComponent } from '@modules/admin/apps/benefits/components/benefit-category-card/benefit-category-card.component';
import { AsyncPipe }                    from '@angular/common';

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
    AsyncPipe
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {
  public categories$ = this._benefitCategoryService.categories$;

  constructor(private readonly _benefitCategoryService: BenefitCategoryService) {}

  ngOnInit(): void {
    lastValueFrom(this._benefitCategoryService.findAll()).then();
  }
}
