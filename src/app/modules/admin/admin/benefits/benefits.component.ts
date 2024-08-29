import { Component }                                           from '@angular/core';
import { RouterOutlet }                                        from '@angular/router';
import { DrawerListingComponent }                              from '@modules/shared/components/drawer-listing/drawer-listing.component';
import { PanelType }                                           from '@modules/shared/components/drawer-listing/panel.type';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { PageHeaderComponent }                                 from '@layout/components/page-header/page-header.component';
import { DrawerContentComponent }                              from '@modules/shared/components/drawer-listing/components/drawer-content.component';
import { DrawerHeaderComponent }                               from '@modules/shared/components/drawer-listing/components/drawer-header.component';

@Component({
  selector: 'app-benefits',
  standalone : true,
  imports : [
    RouterOutlet,
    DrawerListingComponent,
    PageHeaderComponent,
    TranslocoDirective,
    DrawerContentComponent,
    DrawerHeaderComponent,
    TranslocoPipe
  ],
  templateUrl: './benefits.component.html'
})
export class BenefitsComponent {
  panels: PanelType[];

  constructor(private readonly translateService: TranslocoService) {
    this.panels = [
      {
        title      : this.translateService.translate('admin.benefits.title'),
        description: this.translateService.translate('admin.benefits.description'),
        children   : [
          {
            id         : 'list',
            icon       : 'heroicons_outline:list-bullet',
            title      : this.translateService.translate('admin.benefits.list.title'),
            description: this.translateService.translate('admin.benefits.list.description'),
            link       : '/admin/benefits/'
          },
          {
            id         : 'create',
            icon       : 'heroicons_outline:plus-circle',
            title      : this.translateService.translate('admin.benefits.create.title'),
            description: this.translateService.translate('admin.benefits.create.description'),
            link       : '/admin/benefits/create'
          },
        ]
      },
      {
        title      : this.translateService.translate('admin.benefits.category.title'),
        description: this.translateService.translate('admin.benefits.category.description'),
        children   : [
          {
            id         : 'list-categories',
            icon       : 'heroicons_outline:folder',
            title      : this.translateService.translate('admin.benefits.category.list.title'),
            description: this.translateService.translate('admin.benefits.category.list.description'),
            link       : '/admin/benefits/category'
          },
          {
            id         : 'create-category',
            icon       : 'heroicons_outline:plus-circle',
            title      : this.translateService.translate('admin.benefits.category.create.title'),
            description: this.translateService.translate('admin.benefits.category.create.description'),
            link       : '/admin/benefits/category/create'
          },
        ]
      },
      {
        title      : this.translateService.translate('admin.benefits.company.title'),
        description: this.translateService.translate('admin.benefits.company.description'),
        children   : [
          {
            id         : 'list-companies',
            icon       : 'heroicons_outline:building-storefront',
            title      : this.translateService.translate('admin.benefits.company.list.title'),
            description: this.translateService.translate('admin.benefits.company.list.description'),
            link       : '/admin/benefits/company'
          },
          {
            id         : 'create-company',
            icon       : 'heroicons_outline:plus-circle',
            title      : this.translateService.translate('admin.benefits.company.create.title'),
            description: this.translateService.translate('admin.benefits.company.create.description'),
            link       : '/admin/benefits/company/create'
          }
        ]
      }
    ];
  }
}
