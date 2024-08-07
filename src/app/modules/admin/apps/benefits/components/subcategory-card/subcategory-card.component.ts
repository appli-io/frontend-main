import { Component, Input } from '@angular/core';
import { BenefitCategory }  from '@modules/admin/apps/benefits/pages/category-detail/category-detail.component';

@Component({
  selector   : 'subcategory-card',
  standalone : true,
  imports    : [],
  templateUrl: './subcategory-card.component.html'
})
export class SubcategoryCardComponent {
  @Input() subCategory: BenefitCategory;
}
