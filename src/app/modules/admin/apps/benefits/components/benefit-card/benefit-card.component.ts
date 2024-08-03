import { Component, Input } from '@angular/core';
import { RouterLink }       from '@angular/router';

export interface Benefit {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector   : 'benefit-card',
  standalone : true,
  imports    : [
    RouterLink
  ],
  templateUrl: './benefit-card.component.html'
})
export class BenefitCardComponent {
  @Input() benefit: Benefit = {
    id         : '1',
    title      : 'Benefit Title',
    description: 'Benefit Description',
    image      : undefined,
    link       : '/1'
  };
}
