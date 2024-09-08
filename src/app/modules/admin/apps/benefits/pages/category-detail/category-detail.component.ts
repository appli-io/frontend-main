import { Component }                           from '@angular/core';
import { RouterLink }                          from '@angular/router';
import { MatDivider }                          from '@angular/material/divider';
import { MatIcon }                             from '@angular/material/icon';
import { MatAnchor, MatButton, MatIconAnchor } from '@angular/material/button';
import { MatTooltip }                          from '@angular/material/tooltip';

import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { NgxSkeletonLoaderModule }           from 'ngx-skeleton-loader';

import { FuseCardComponent }            from '@fuse/components/card';
import { BenefitCategoryCardComponent } from '@modules/admin/apps/benefits/components/benefit-category-card/benefit-category-card.component';
import { BenefitCategory }              from '@modules/admin/admin/benefits/models/benefit-category';

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
    MatAnchor
  ],
  templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent {
  category: BenefitCategory = {
    id         : 'uuid1',
    name       : 'Salud',
    description: 'Descuentos en farmacias, ópticas y centros médicos',
    active     : true,
    order      : 0,
    icon       : {
      name       : 'salud.svg',
      filepath   : 'https://masbeneficios.cajalosandes.cl/img/salud.svg',
      contentType: 'image/svg+xml',
      fileUrl    : 'https://masbeneficios.cajalosandes.cl/img/salud.svg',
    },
    // Random image from picsum
    image        : {
      name       : 'random.jpg',
      filepath   : 'https://picsum.photos/1280/300',
      contentType: 'image/jpeg',
      fileUrl    : 'https://picsum.photos/1280/300',
    },
    metadata     : {},
    parent       : null,
    subCategories: [
      {
        id         : 'uuid1-1',
        name       : 'Salud',
        description: 'Descuentos en farmacias, ópticas y centros médicos',
        active     : true,
        order      : 0,
        icon       : {
          name       : 'salud.svg',
          filepath   : 'https://masbeneficios.cajalosandes.cl/img/salud.svg',
          contentType: 'image/svg+xml',
          fileUrl    : 'https://masbeneficios.cajalosandes.cl/img/salud.svg',
        },
        // Random image from picsum
        image        : {
          name       : 'random.jpg',
          filepath   : 'https://picsum.photos/1280/300',
          contentType: 'image/jpeg',
          fileUrl    : 'https://picsum.photos/1280/300',
        },
        metadata     : {},
        subCategories: [],
        benefits     : []
      }
    ],
    benefits     : []
  };
}
