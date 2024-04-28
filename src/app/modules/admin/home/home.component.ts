import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { MatIcon }                                              from '@angular/material/icon';
import { MatAnchor, MatButton }                                 from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger }                 from '@angular/material/menu';
import { MatRipple }                                            from '@angular/material/core';
import { ActivatedRoute, RouterLink }                           from '@angular/router';

import { TranslocoDirective }                       from '@ngneat/transloco';
import { A11y, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions }                            from 'swiper/types';

import { SwiperDirective }              from '@core/directives/swiper/swiper.directive';
import { INews }                        from '@modules/admin/news/domain/interfaces/news.interface';
import { IUser }                        from '@modules/admin/profile/interfaces/user.interface';
import { FuseCardComponent }            from '../../../../@fuse/components/card';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { IEconomicIndicator }           from '@modules/admin/home/interface/economic-indicator.interface';

@Component({
  selector     : 'home',
  standalone   : true,
  templateUrl  : './home.component.html',
  schemas      : [ CUSTOM_ELEMENTS_SCHEMA ],
  encapsulation: ViewEncapsulation.None,
  imports      : [ TranslocoDirective, MatIcon, MatButton, MatMenuTrigger, MatMenu, MatRipple, MatMenuItem, SwiperDirective, FuseCardComponent, MatAnchor, RouterLink, DatePipe, CurrencyPipe, NgIf ]
})
export class HomeComponent {
  user: IUser;
  highlightedNews: INews[];
  assignedCompanies: any[];
  selectedCompany: any;
  economicIndicators: IEconomicIndicator;

  config: SwiperOptions = {
    modules      : [ Navigation, Pagination, A11y, Mousewheel ],
    autoHeight   : false,
    navigation   : true,
    loop         : true,
    pagination   : {clickable: true, dynamicBullets: true},
    slidesPerView: 1

    // breakpoints   : {
    //   400: {
    //     slidesPerView : 1,
    //     centeredSlides: true
    //   },
    // }
  };

  constructor(private readonly route: ActivatedRoute) {
    console.log(route.snapshot.data);
    this.user = route.snapshot.data.user;
    this.highlightedNews = route.snapshot.data.highlightedNews;
    this.assignedCompanies = route.snapshot.data.assignedCompanies;
    this.selectedCompany = this.assignedCompanies[0] || undefined;
    this.economicIndicators = route.snapshot.data.economicIndicators;
  }
}
