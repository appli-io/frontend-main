import { Component, Input } from '@angular/core';
import { RouterLink }       from '@angular/router';
import { BenefitCategory }  from '@modules/admin/apps/benefits/pages/category-detail/category-detail.component';

@Component({
  selector   : 'benefit-card',
  standalone : true,
  imports    : [
    RouterLink
  ],
  templateUrl: './benefit-category-card.component.html'
})
export class BenefitCategoryCardComponent {
  @Input() category: BenefitCategory;
}
