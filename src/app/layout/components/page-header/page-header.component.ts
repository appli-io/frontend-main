import { Component, Input } from '@angular/core';
import { UpperCasePipe }    from '@angular/common';

@Component({
  selector   : 'page-header',
  standalone : true,
  imports    : [
    UpperCasePipe
  ],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() description: string;
  @Input() bgImage: string;
}
