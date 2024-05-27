import { Component }                from '@angular/core';
import { TranslocoDirective }       from '@ngneat/transloco';
import { PageHeaderComponent }      from '../../../../layout/common/page-header/page-header.component';
import { FuseCardComponent }        from '../../../../../@fuse/components/card';
import { MatDivider }               from '@angular/material/divider';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon }                  from '@angular/material/icon';
import { RouterLink }               from '@angular/router';

@Component({
  selector   : 'app-albums',
  standalone : true,
  imports: [
    TranslocoDirective,
    PageHeaderComponent,
    FuseCardComponent,
    MatDivider,
    MatIconButton,
    MatIcon,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './albums.component.html'
})
export class AlbumsComponent {

}
