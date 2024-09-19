import { Component, inject }                   from '@angular/core';
import { ActivatedRoute, RouterLink }          from '@angular/router';
import { MatDivider }                          from '@angular/material/divider';
import { MatIcon }                             from '@angular/material/icon';
import { MatAnchor, MatButton, MatIconAnchor } from '@angular/material/button';
import { MatTooltip }                          from '@angular/material/tooltip';

import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { NgxSkeletonLoaderModule }           from 'ngx-skeleton-loader';

import { FuseCardComponent }              from '@fuse/components/card';
import { BenefitCategoryCardComponent }   from '@modules/admin/apps/benefits/components/benefit-category-card/benefit-category-card.component';
import { BenefitCategory }                from '@modules/admin/admin/benefits/models/benefit-category';
import { AsyncPipe }                      from '@angular/common';
import { BenefitCardComponent }           from '@modules/admin/apps/benefits/components/benefit-card/benefit-card.component';
import { MatProgressSpinner }             from '@angular/material/progress-spinner';
import { Benefit }                        from '@modules/admin/admin/benefits/models/benefit';
import { Observable }                     from 'rxjs';
import { BenefitCategoriesListComponent } from '@modules/admin/apps/benefits/components/benefit-categories-list/benefit-categories-list.component';
import { DeltaToHtmlPipe }                from '@core/pipe/delta-to-html.pipe';
import { BenefitCategoryService }         from '@modules/admin/admin/benefits/services/benefit-category.service';

@Component({
  selector   : 'app-category-detail',
  standalone : true,
  imports: [
    TranslocoDirective,
    RouterLink,
    TranslocoPipe,
    MatDivider,
    MatIcon,
    MatButton,
    MatTooltip,
    BenefitCategoryCardComponent,
    NgxSkeletonLoaderModule,
    MatIconAnchor,
    FuseCardComponent,
    MatAnchor,
    AsyncPipe,
    BenefitCardComponent,
    MatProgressSpinner,
    BenefitCategoriesListComponent,
    DeltaToHtmlPipe
  ],
  templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent {
  private readonly _benefitCategoryService: BenefitCategoryService = inject(BenefitCategoryService);
  public category$: Observable<BenefitCategory> = this._benefitCategoryService.selectedCategory$;
  public benefits$: Observable<Benefit[]> = this._benefitCategoryService.selectedCategoryBenefits$;
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
}
