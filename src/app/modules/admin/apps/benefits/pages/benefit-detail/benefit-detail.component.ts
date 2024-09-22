import { Component, inject, Input }                     from '@angular/core';
import { TranslocoDirective, TranslocoPipe }            from '@ngneat/transloco';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon }                                      from '@angular/material/icon';
import { DeltaToHtmlPipe }                              from '@core/pipe/delta-to-html.pipe';
import { Benefit }                                      from '@modules/admin/admin/benefits/models/benefit';
import { MatButton, MatIconAnchor, MatIconButton }      from '@angular/material/button';
import { MatDivider }                                   from '@angular/material/divider';

@Component({
  selector   : 'app-benefit-detail',
  standalone : true,
  imports: [
    TranslocoDirective,
    RouterLink,
    TranslocoPipe,
    MatIcon,
    DeltaToHtmlPipe,
    MatIconButton,
    MatButton,
    MatIconAnchor,
    MatDivider,
    RouterLinkActive
  ],
  templateUrl: './benefit-detail.component.html'
})
export class BenefitDetailComponent {
  @Input() tab: string;
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  public benefit: Benefit = this._route.snapshot.data.benefit;
}
