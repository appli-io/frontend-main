import { UpperCasePipe }    from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTooltip }       from '@angular/material/tooltip';
import { RouterLink }       from '@angular/router';

import { FuseCardComponent } from '@fuse/components/card';
import { BenefitCategory }   from '@modules/admin/admin/benefits/models/benefit-category';
import { DeltaToHtmlPipe }   from '@core/pipe/delta-to-html.pipe';

@Component({
  selector   : 'benefit-card',
  standalone : true,
  imports: [
    RouterLink,
    FuseCardComponent,
    UpperCasePipe,
    MatTooltip,
    DeltaToHtmlPipe
  ],
  templateUrl: './benefit-category-card.component.html'
})
export class BenefitCategoryCardComponent {
  @Input() category: BenefitCategory;
}
