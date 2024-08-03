import { Component }                         from '@angular/core';
import { PageHeaderComponent }               from '@layout/components/page-header/page-header.component';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { MatIcon }                           from '@angular/material/icon';
import { MatIconAnchor }                     from '@angular/material/button';
import { MatTooltip }                        from '@angular/material/tooltip';
import { BenefitCardComponent }              from '@modules/admin/apps/benefits/components/benefit-card/benefit-card.component';
import { RouterLink }                        from '@angular/router';

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
    BenefitCardComponent,
    RouterLink
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {
  benefits = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ];
}
