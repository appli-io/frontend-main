import { Component, OnInit } from '@angular/core';
import { NgIf }              from '@angular/common';
import { HttpClient }        from '@angular/common/http';
import { MatIcon }           from '@angular/material/icon';

import { TranslocoDirective } from '@ngneat/transloco';
import { lastValueFrom }      from 'rxjs';

import { Api }                     from '@core/interfaces/api';
import { NewsCardComponent }       from '@modules/admin/news/components/news-card/news-card.component';
import { NewsListHeaderComponent } from '@modules/admin/news/components/news-list-header/news-list-header.component';
import { IBioBioNews }             from '@modules/admin/news/domain/interfaces/biobio-news.interface';
import { INews }                   from '@modules/admin/news/domain/interfaces/news.interface';

@Component({
  selector   : 'external-biobio',
  standalone : true,
  imports: [
    TranslocoDirective,
    NewsListHeaderComponent,
    MatIcon,
    NewsCardComponent,
    NgIf
  ],
  templateUrl: './external-biobio.component.html'
})
export class ExternalBiobioComponent implements OnInit {
  newsList: INews[] = [];

  constructor(private readonly _httpClient: HttpClient) {}

  async ngOnInit() {
    const response = await lastValueFrom(this._httpClient.get<Api<IBioBioNews[]>>('api/biobio')).then(res => res.content);

    response.map(bbn => {
      this.newsList.push({
        id           : bbn.ID.toString(),
        headline     : bbn.post_title,
        abstract     : bbn.post_excerpt,
        body         : bbn.post_content,
        portraitImage: {
          name   : bbn.post_image.caption,
          fileUrl: 'https://media.biobiochile.cl/wp-content/uploads/' + bbn.post_image.URL
        },
        category     : {
          id  : bbn.post_category_primary.term_id.toString(),
          name: bbn.post_category_primary.name,
          slug: bbn.post_category_primary.slug
        },
        createdBy    : {
          id   : bbn.author.id.toString(),
          name : bbn.author.display_name,
          email: bbn.author.user_email
        },
        publishedAt  : new Date(bbn.post_date_timestamp),
        custom       : {
          url: bbn.post_URL_https
        }
      });
    });
  }
}
