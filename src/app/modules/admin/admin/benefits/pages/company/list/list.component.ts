import { ChangeDetectionStrategy, Component }                                 from '@angular/core';
import { TranslocoDirective }                                                 from '@ngneat/transloco';
import { PageHeaderComponent }                                                from '@layout/components/page-header/page-header.component';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef } from '@angular/material/table';
import { MatIcon }                                                            from '@angular/material/icon';
import { MatIconButton }                                                      from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger }                               from '@angular/material/menu';
import { MatSort, MatSortHeader }                                             from '@angular/material/sort';
import { Table }                                                              from '@modules/shared/components/table/table.component';
import { BenefitCompany }                                                     from '@modules/admin/admin/benefits/models/benefit-company';
import { BenefitCompanyService }                                              from '@modules/admin/admin/benefits/services/benefit-company.service';
import { AbstractListComponent }                                              from '@modules/shared/components/abstracts/abstract-list.component';

@Component({
  selector   : 'app-list',
  standalone : true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports        : [
    TranslocoDirective,
    PageHeaderComponent,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatSort,
    MatSortHeader,
    Table,
    MatHeaderCellDef,
    MatMenuTrigger
  ],
  templateUrl: './list.component.html'
})
export class ListComponent extends AbstractListComponent<BenefitCompany> {
  public columns: Array<keyof BenefitCompany | string> = [ 'name', 'actions' ];

  constructor(
    private readonly _benefitCompanyService: BenefitCompanyService
  ) {
    super(
      _benefitCompanyService,
      _benefitCompanyService.companies$
    );
  }

  edit(item: BenefitCompany) {
    console.log('Edit item', item);
  }
}
