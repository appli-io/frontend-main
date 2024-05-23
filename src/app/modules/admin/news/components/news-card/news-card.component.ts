import { Component, Input }    from '@angular/core';
import { FuseCardComponent }   from '../../../../../../@fuse/components/card';
import { MatAnchor }           from '@angular/material/button';
import { NgIf, UpperCasePipe } from '@angular/common';
import { RouterLink }          from '@angular/router';
import { relativeTime }        from '@core/utils';
import { INews }               from '@modules/admin/news/domain/interfaces/news.interface';
import { MatIcon }             from '@angular/material/icon';

@Component({
  selector   : 'news-card',
  standalone : true,
  imports    : [
    FuseCardComponent,
    MatAnchor,
    UpperCasePipe,
    RouterLink,
    NgIf,
    MatIcon
  ],
  templateUrl: './news-card.component.html'
})
export class NewsCardComponent {
  @Input() useRouter: boolean = true;
  @Input() actionText: string;
  @Input() news: INews;
  @Input() index: number;

  protected readonly relativeTime = relativeTime;
}
