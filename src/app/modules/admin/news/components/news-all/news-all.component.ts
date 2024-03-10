import { Component, OnInit }                     from '@angular/core';
import { NgClass, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { RouterLink, RouterOutlet }              from '@angular/router';
import { MatIconModule }                         from '@angular/material/icon';
import { MatTooltipModule }                      from '@angular/material/tooltip';
import { MatButtonModule }                       from '@angular/material/button';

import { TranslocoDirective } from '@ngneat/transloco';
import { fakerES as faker }   from '@faker-js/faker';
import { DateTime }           from 'luxon';

import { FuseCardComponent } from '@fuse/components/card';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';

import { INews }     from '../../domain/interfaces/news.interface';
import { ICategory } from '../../domain/interfaces/category.interface';

@Component({
  selector: 'app-news-all',
  standalone: true,
  imports: [ RouterOutlet, TranslocoDirective, MatIconModule, NgIf, UpperCasePipe, FuseFindByKeyPipe, NgClass, NgForOf, MatTooltipModule, MatButtonModule, RouterLink, FuseCardComponent ],
  templateUrl: './news-all.component.html'
})
export class NewsAllComponent implements OnInit {
  categories: ICategory[];
  news: INews[];

  ngOnInit(): void {
    this.initializeDummyData();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  initializeDummyData(): void {
    this.categories = [
      {
        id: faker.string.uuid(),
        name: faker.lorem.words(2),
        slug: faker.lorem.slug(2),
      },
      {
        id: faker.string.uuid(),
        name: faker.lorem.words(2),
        slug: faker.lorem.slug(2),
      },
      {
        id: faker.string.uuid(),
        name: faker.lorem.words(2),
        slug: faker.lorem.slug(2),
      },
    ];

    this.news = [
      {
        id: faker.string.uuid(),
        headline: faker.lorem.lines(1),
        slug: faker.lorem.slug(7),
        abstract: faker.lorem.lines(2),
        category: this.categories[0].slug,
        isRead: faker.datatype.boolean(),
        readTime: faker.number.int({min: 1, max: 59}),
        images: [ faker.image.url() ],
        publishedAt: faker.date.past().getTime(),
        updatedAt: faker.date.past().getTime(),
        createdBy: faker.person.firstName(),
      },
      {
        id: faker.string.uuid(),
        headline: faker.lorem.lines(1),
        slug: faker.lorem.slug(7),
        abstract: faker.lorem.lines(2),
        category: this.categories[1].slug,
        isRead: faker.datatype.boolean(),
        readTime: faker.number.int({min: 1, max: 59}),
        images: [ faker.image.url() ],
        publishedAt: faker.date.past().getTime(),
        updatedAt: faker.date.past().getTime(),
        createdBy: faker.person.firstName(),
      },
      {
        id: faker.string.uuid(),
        headline: faker.lorem.lines(1),
        slug: faker.lorem.slug(7),
        abstract: faker.lorem.lines(2),
        category: this.categories[2].slug,
        isRead: faker.datatype.boolean(),
        readTime: faker.number.int({min: 1, max: 59}),
        images: [ faker.image.url() ],
        publishedAt: faker.date.past().getTime(),
        updatedAt: faker.date.past().getTime(),
        createdBy: faker.person.firstName(),
      },
      {
        id: faker.string.uuid(),
        headline: faker.lorem.lines(1),
        slug: faker.lorem.slug(7),
        abstract: faker.lorem.lines(2),
        category: this.categories[0].slug,
        isRead: faker.datatype.boolean(),
        readTime: faker.number.int({min: 1, max: 59}),
        images: [ faker.image.url() ],
        publishedAt: faker.date.past().getTime(),
        updatedAt: faker.date.past().getTime(),
        createdBy: faker.person.firstName(),
      },
      {
        id: faker.string.uuid(),
        headline: faker.lorem.lines(1),
        slug: faker.lorem.slug(7),
        abstract: faker.lorem.lines(2),
        category: this.categories[1].slug,
        isRead: faker.datatype.boolean(),
        readTime: faker.number.int({min: 1, max: 59}),
        images: [ faker.image.url() ],
        publishedAt: faker.date.past().getTime(),
        updatedAt: faker.date.past().getTime(),
        createdBy: faker.person.firstName(),
      },
      {
        id: faker.string.uuid(),
        headline: faker.lorem.lines(1),
        slug: faker.lorem.slug(7),
        abstract: faker.lorem.lines(2),
        category: this.categories[2].slug,
        isRead: faker.datatype.boolean(),
        readTime: faker.number.int({min: 1, max: 59}),
        images: [ faker.image.url() ],
        publishedAt: faker.date.past().getTime(),
        updatedAt: faker.date.past().getTime(),
        createdBy: faker.person.firstName(),
      },
      {
        id: faker.string.uuid(),
        headline: faker.lorem.lines(1),
        slug: faker.lorem.slug(7),
        abstract: faker.lorem.lines(2),
        category: this.categories[0].slug,
        isRead: faker.datatype.boolean(),
        readTime: faker.number.int({min: 1, max: 59}),
        images: [ faker.image.url() ],
        publishedAt: faker.date.past().getTime(),
        updatedAt: faker.date.past().getTime(),
        createdBy: faker.person.firstName(),
      },
      {
        id: faker.string.uuid(),
        headline: faker.lorem.lines(1),
        slug: faker.lorem.slug(7),
        abstract: faker.lorem.lines(2),
        category: this.categories[1].slug,
        isRead: faker.datatype.boolean(),
        readTime: faker.number.int({min: 1, max: 59}),
        images: [ faker.image.url() ],
        publishedAt: faker.date.past().getTime(),
        updatedAt: faker.date.past().getTime(),
        createdBy: faker.person.firstName(),
      },
      {
        id: faker.string.uuid(),
        headline: faker.lorem.lines(1),
        slug: faker.lorem.slug(7),
        abstract: faker.lorem.lines(2),
        category: this.categories[2].slug,
        isRead: faker.datatype.boolean(),
        readTime: faker.number.int({min: 1, max: 59}),
        images: [ faker.image.url() ],
        publishedAt: faker.date.past().getTime(),
        updatedAt: faker.date.past().getTime(),
        createdBy: faker.person.firstName(),
      },
    ];
  }

  relativeTime = (date: number) => {
    return DateTime.fromMillis(date).toRelative();
  };
}
