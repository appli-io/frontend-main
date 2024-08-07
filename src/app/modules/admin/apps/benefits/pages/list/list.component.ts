import { Component }                         from '@angular/core';
import { PageHeaderComponent }               from '@layout/components/page-header/page-header.component';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { MatIcon }                           from '@angular/material/icon';
import { MatIconAnchor }                     from '@angular/material/button';
import { MatTooltip }                        from '@angular/material/tooltip';
import { Benefit, BenefitCardComponent }     from '@modules/admin/apps/benefits/components/benefit-card/benefit-card.component';
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
  benefits: Benefit[] = [
    {
      id         : 'uuid1',
      icon       : 'https://masbeneficios.cajalosandes.cl/img/salud.svg',
      link       : './id/uuid1',
      title      : 'Salud',
      description: 'Descuentos en farmacias, ópticas y centros médicos'
    },
    {
      id         : 'uuid2',
      icon       : 'https://masbeneficios.cajalosandes.cl/img/emprendimiento.svg',
      link       : './id/uuid2',
      title      : 'Emprendimiento',
      description: 'Descuentos en servicios de diseño, marketing y más'
    }
  ];
}
