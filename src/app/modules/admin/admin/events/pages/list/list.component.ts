import { Component }           from '@angular/core';
import { TranslocoDirective }  from '@ngneat/transloco';
import { PageHeaderComponent } from '@layout/components/page-header/page-header.component';

@Component({
  selector   : 'app-list',
  standalone : true,
  imports    : [
    TranslocoDirective,
    PageHeaderComponent
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {

}
