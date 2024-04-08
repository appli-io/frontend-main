import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgOptimizedImage }                       from '@angular/common';
import { CdkScrollable }                                        from '@angular/cdk/overlay';
import { MatButtonModule }                                      from '@angular/material/button';
import { MatDividerModule }                                     from '@angular/material/divider';
import { MatIconModule }                                        from '@angular/material/icon';
import { MatInputModule }                                       from '@angular/material/input';
import { MatTooltipModule }                                     from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink }                           from '@angular/router';

import { SwiperOptions }                            from 'swiper/types';
import { A11y, Mousewheel, Navigation, Pagination } from 'swiper/modules';

import { FuseCardComponent } from '@fuse/components/card';
import { SwiperDirective }   from '@core/directives/swiper/swiper.directive';

import { INews }              from '../../domain/interfaces/news.interface';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-single-news',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, RouterLink, MatIconModule, CdkScrollable, MatDividerModule, MatTooltipModule, FuseCardComponent, MatInputModule, SwiperDirective, NgOptimizedImage, TranslocoDirective ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './single-news.component.html',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SingleNewsComponent {
  news: INews;

  public config: SwiperOptions = {
    modules: [ Navigation, Pagination, A11y, Mousewheel ],
    autoHeight: false,
    spaceBetween: 20,
    navigation: true,
    loop: true,
    pagination: {clickable: true, dynamicBullets: true},
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints: {
      400: {
        slidesPerView: 1,
        centeredSlides: true
      },
    }
  };

  // in the constructor, get object news from resolver
  constructor(private route: ActivatedRoute) {
    this.news = this.route.snapshot.data.resolvedNews;
    console.log(this.news);
  }
}
