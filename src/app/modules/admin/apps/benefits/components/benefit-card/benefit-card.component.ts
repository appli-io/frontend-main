import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIcon }                                   from '@angular/material/icon';
import { NgIf, UpperCasePipe }                       from '@angular/common';

import { FuseCardComponent } from '@fuse/components/card';
import { Benefit }           from '@modules/admin/admin/benefits/models/benefit';
import { MatTooltip }        from '@angular/material/tooltip';
import { DeltaToHtmlPipe }   from '@core/pipe/delta-to-html.pipe';

@Component({
  selector       : 'benefit-card',
  standalone     : true,
  imports        : [
    FuseCardComponent,
    MatIcon,
    NgIf,
    UpperCasePipe,
    MatTooltip,
    DeltaToHtmlPipe
  ],
  templateUrl    : './benefit-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BenefitCardComponent {
  @Input() benefit!: Benefit;
  @Input() index: number = 0;
}
