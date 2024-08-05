import { Component }                         from '@angular/core';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { RouterLink }                        from '@angular/router';
import { IImage }                            from '@modules/admin/news/domain/interfaces/news.interface';
import { MatDivider }                        from '@angular/material/divider';
import { MatIcon }                           from '@angular/material/icon';
import { MatButton, MatIconAnchor }          from '@angular/material/button';
import { MatTooltip }                        from '@angular/material/tooltip';
import { BenefitCardComponent }              from '@modules/admin/apps/benefits/components/benefit-card/benefit-card.component';
import { NgxSkeletonLoaderModule }           from 'ngx-skeleton-loader';
import { SubcategoryCardComponent }          from '@modules/admin/apps/benefits/components/subcategory-card/subcategory-card.component';

export interface BenefitCategory {
  id: string;
  name: string;
  description: string;
  active: boolean;
  order: number;
  icon: IImage;
  image: IImage;
  metadata: Record<string, any>;
  parent?: BenefitCategory;
  subCategories: BenefitCategory[];
  benefits: any[];
}

@Component({
  selector   : 'app-category-detail',
  standalone : true,
  imports    : [
    TranslocoDirective,
    RouterLink,
    TranslocoPipe,
    MatDivider,
    MatIcon,
    MatButton,
    MatTooltip,
    BenefitCardComponent,
    NgxSkeletonLoaderModule,
    MatIconAnchor,
    SubcategoryCardComponent
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
