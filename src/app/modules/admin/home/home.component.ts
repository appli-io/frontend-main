import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { MatIcon }                                                             from '@angular/material/icon';
import { MatAnchor, MatButton }                                                from '@angular/material/button';
import { ActivatedRoute, RouterLink }                                          from '@angular/router';

import { TranslocoDirective } from '@ngneat/transloco';

import { SwiperDirective }                             from '@core/directives/swiper/swiper.directive';
import { INews }                                       from '@modules/admin/news/domain/interfaces/news.interface';
import { IUser }                                       from '@modules/admin/profile/interfaces/user.interface';
import { FuseCardComponent }                           from '../../../../@fuse/components/card';
import { CurrencyPipe, DatePipe, NgIf, UpperCasePipe } from '@angular/common';
import { IEconomicIndicator }                          from '@modules/admin/home/interface/economic-indicator.interface';
import { ShortcutsComponent }                          from '@modules/admin/home/components/shortcuts/shortcuts.component';
import { MatProgressBar }                              from '@angular/material/progress-bar';
import { CalendarComponent }                           from '@modules/admin/home/components/calendar/calendar.component';
import Splide                                          from '@splidejs/splide';
import { relativeTime }                                from '@core/utils';

@Component({
  selector     : 'home',
  standalone   : true,
  templateUrl  : './home.component.html',
  schemas      : [ CUSTOM_ELEMENTS_SCHEMA ],
  encapsulation: ViewEncapsulation.None,
  imports: [
    TranslocoDirective,
    MatIcon,
    MatButton,
    SwiperDirective,
    FuseCardComponent,
    MatAnchor,
    RouterLink,
    DatePipe,
    CurrencyPipe,
    NgIf,
    ShortcutsComponent,
    MatProgressBar,
    CalendarComponent,
    UpperCasePipe
  ],
})
export class HomeComponent implements AfterViewInit {
  user: IUser;
  highlightedNews: INews[];
  economicIndicators: IEconomicIndicator;

  constructor(private readonly route: ActivatedRoute) {
    console.log(route.snapshot.data);
    this.user = route.snapshot.data.user;
    this.highlightedNews = route.snapshot.data.highlightedNews;
    this.economicIndicators = route.snapshot.data.economicIndicators;
  }

  protected readonly relativeTime = relativeTime;

  ngAfterViewInit() {
    new Splide('.splide', {
      type : 'loop',
      gap  : '5rem',
      focus: 'center',
      // autoplay    : true,
      pagination  : true,
      lazyLoad    : 'nearby',
      pauseOnHover: true,
      perPage     : 3,
      perMove     : 1,
      breakpoints : {
        240 : {
          perPage: 1,
        },
        768 : {
          perPage: 3,
        },
        1024: {
          perPage: 3,
        }
      }
    }).mount();
  }
}
