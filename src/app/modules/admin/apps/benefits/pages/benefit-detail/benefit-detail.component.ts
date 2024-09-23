import { AsyncPipe, NgTemplateOutlet }                  from '@angular/common';
import { Component, inject, Input, OnInit }             from '@angular/core';
import { MatIcon }                                      from '@angular/material/icon';
import { MatButton, MatIconAnchor, MatIconButton }      from '@angular/material/button';
import { MatDivider }                                   from '@angular/material/divider';
import { MatProgressSpinner }                           from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

import { TranslocoDirective, TranslocoPipe }           from '@ngneat/transloco';
import { BehaviorSubject, map, Observable, takeUntil } from 'rxjs';

import { DeltaToHtmlPipe }      from '@core/pipe/delta-to-html.pipe';
import { SubComponent }         from '@layout/components/sub-component/sub-component';
import { Benefit }              from '@modules/admin/admin/benefits/models/benefit';
import { BenefitsService }      from '@modules/admin/admin/benefits/services/benefits.service';
import { BenefitCardComponent } from '@modules/admin/apps/benefits/components/benefit-card/benefit-card.component';

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
    RouterLinkActive,
    NgTemplateOutlet,
    AsyncPipe,
    BenefitCardComponent,
    MatProgressSpinner
  ],
  templateUrl: './benefit-detail.component.html'
})
export class BenefitDetailComponent extends SubComponent implements OnInit {
  @Input() tab: string;
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  public benefit: Observable<Benefit> = this._route.data.pipe(map((data) => data.benefit));
  private readonly _benefitsService: BenefitsService = inject(BenefitsService);

  private _mostViewedBenefits: BehaviorSubject<Benefit[]> = new BehaviorSubject<Benefit[]>(undefined);

  get mostViewedBenefits() {
    return this._mostViewedBenefits.asObservable();
  }

  ngOnInit() {
    this._benefitsService.findMostViewed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (value) => this._mostViewedBenefits.next(value)
      });
  }
}
