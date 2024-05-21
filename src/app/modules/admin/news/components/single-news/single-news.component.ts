import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgOptimizedImage }                                                 from '@angular/common';
import { CdkScrollable }                                                                  from '@angular/cdk/overlay';
import { MatButtonModule }                                                                from '@angular/material/button';
import { MatDividerModule }                                                               from '@angular/material/divider';
import { MatIconModule }                                                                  from '@angular/material/icon';
import { MatInputModule }                                                                 from '@angular/material/input';
import { MatTooltipModule }                                                               from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink }                                                     from '@angular/router';

import { TranslocoDirective }                       from '@ngneat/transloco';
import { LightgalleryModule }                       from 'lightgallery/angular';
import { SwiperOptions }                            from 'swiper/types';
import { A11y, Mousewheel, Navigation, Pagination } from 'swiper/modules';

import { FuseCardComponent } from '@fuse/components/card';
import { SwiperDirective }   from '@core/directives/swiper/swiper.directive';
import { UserService }       from '@core/user/user.service';

import { INews }        from '../../domain/interfaces/news.interface';
import { LightGallery } from 'lightgallery/lightgallery';
import lightGallery     from 'lightgallery';

@Component({
  selector   : 'app-single-news',
  standalone : true,
  imports    : [ CommonModule, MatButtonModule, RouterLink, MatIconModule, CdkScrollable, MatDividerModule, MatTooltipModule, FuseCardComponent, MatInputModule, SwiperDirective, NgOptimizedImage, TranslocoDirective, LightgalleryModule ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './single-news.component.html',
  schemas    : [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SingleNewsComponent implements AfterViewInit {
  @ViewChild('lightGallery') lightGallery;
  inlineGallery: LightGallery;
  news: INews;
  settings = {};

  public config: SwiperOptions = {
    modules      : [ Navigation, Pagination, A11y, Mousewheel ],
    autoHeight   : false,
    navigation   : true,
    loop         : true,
    pagination   : {clickable: false, dynamicBullets: true},
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints  : {
      400: {
        slidesPerView: 1,
        centeredSlides: true
      },
    }
  };

  // in the constructor, get object news from resolver
  constructor(
    private readonly route: ActivatedRoute,
    public readonly userService: UserService
  ) {
    this.news = this.route.snapshot.data.news;
  }

  ngAfterViewInit() {
    console.log(this.lightGallery);
    const lgContainer = this.lightGallery._elementRef.nativeElement;

    const items = [];

    if (this.news.portraitImage)
      items.push({
        src  : this.news.portraitImage.file,
        thumb: this.news.portraitImage.file,
        download: this.news.portraitImage.name,
        subHtml : `<div class="lightGallery-captions">
                <h4>${ this.news.portraitImage.name }</h4>
            </div>`
      });

    if (this.news.images?.length > 0)
      items.push(
        ...this.news.images?.map((image) => ({
          src  : image.file,
          thumb: image.file,
          download: image.name,
          subHtml: `<div class="lightGallery-captions">
                <h4>${ image.name }</h4>
                <p>Description of the slide 1</p>
            </div>`
        }))
      );

    this.inlineGallery = lightGallery(lgContainer, {
      loop      : true,
      actualSize: true,
      dynamic   : true,
      // Turn off hash plugin in case if you are using it
      // as we don't want to change the url on slide change
      hash: false,
      // Do not allow users to close the gallery
      closable        : true,
      appendSubHtmlTo : '.lg-item',
      dynamicEl       : [ ...items ],
      autoplay        : true,
      autoplayControls: true
    });
  }

  openGallery(index) {
    this.inlineGallery.openGallery(index);
  }
}
