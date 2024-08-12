import { Component }                         from '@angular/core';
import { PageHeaderComponent }               from '@layout/components/page-header/page-header.component';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { MatIcon }                           from '@angular/material/icon';
import { MatIconAnchor }                     from '@angular/material/button';
import { MatTooltip }                        from '@angular/material/tooltip';
import { RouterLink }                        from '@angular/router';
import { BenefitCategory }                   from '@modules/admin/apps/benefits/pages/category-detail/category-detail.component';
import { fakerES }                           from '@faker-js/faker';
import { BenefitCategoryCardComponent }      from '@modules/admin/apps/benefits/components/benefit-category-card/benefit-category-card.component';

@Component({
  selector   : 'app-list',
  standalone : true,
  imports    : [
    PageHeaderComponent,
    TranslocoDirective,
    MatIcon,
    MatIconAnchor,
    TranslocoPipe,
    MatTooltip,
    BenefitCategoryCardComponent,
    RouterLink
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {
  benefits: BenefitCategory[] = [
    {
      id         : fakerES.string.uuid(),
      icon       : {
        name       : 'salud.svg',
        filepath   : 'https://masbeneficios.cajalosandes.cl/img/salud.svg',
        contentType: 'image/svg+xml',
        fileUrl    : 'https://masbeneficios.cajalosandes.cl/img/salud.svg',
      },
      name       : fakerES.lorem.words(),
      description: fakerES.lorem.paragraph(),
      active     : true,
      order      : 0,
    }
  ];
}
