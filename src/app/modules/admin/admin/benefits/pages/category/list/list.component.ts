import { Component }                                                          from '@angular/core';
import { TranslocoDirective }                                                 from '@ngneat/transloco';
import { PageHeaderComponent }                                                from '@layout/components/page-header/page-header.component';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef } from '@angular/material/table';
import { MatIcon }                                                            from '@angular/material/icon';
import { MatIconButton }                                                      from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger }                               from '@angular/material/menu';
import { MatSort, MatSortHeader }                                             from '@angular/material/sort';
import { Table }                                                              from '@modules/shared/table/table.component';
import { BenefitCategory }                                                    from '@modules/admin/admin/benefits/models/benefit-category';
import { BenefitCategoryService }                                             from '@modules/admin/admin/benefits/services/benefit-category.service';

@Component({
  selector   : 'app-list',
  standalone : true,
  imports    : [
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
export class ListComponent {
  public categories$ = this._categoryService.categories$;
  public columns: Array<keyof BenefitCategory | string> = [ 'name', 'active', 'order', 'actions' ];

  constructor(private readonly _categoryService: BenefitCategoryService) {}

}
