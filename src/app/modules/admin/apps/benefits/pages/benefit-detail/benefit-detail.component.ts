import { Component, inject }                 from '@angular/core';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { ActivatedRoute, RouterLink }        from '@angular/router';
import { MatIcon }                           from '@angular/material/icon';
import { DeltaToHtmlPipe }                   from '@core/pipe/delta-to-html.pipe';
import { Benefit }                           from '@modules/admin/admin/benefits/models/benefit';

@Component({
  selector   : 'app-benefit-detail',
  standalone : true,
  imports    : [
    TranslocoDirective,
    RouterLink,
    TranslocoPipe,
    MatIcon,
    DeltaToHtmlPipe
  ],
  templateUrl: './benefit-detail.component.html'
})
export class BenefitDetailComponent {
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  public benefit: Benefit = this._route.snapshot.data.benefit;
}
