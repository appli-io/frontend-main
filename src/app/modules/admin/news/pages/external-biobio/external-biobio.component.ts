import { Component, OnInit }       from '@angular/core';
import { HttpClient }              from '@angular/common/http';
import { lastValueFrom }           from 'rxjs';
import { INews }                   from '@modules/admin/news/domain/interfaces/news.interface';
import { IBioBioNews }             from '@modules/admin/news/domain/interfaces/biobio-news.interface';
import { TranslocoDirective }      from '@ngneat/transloco';
import { NewsListHeaderComponent } from '@modules/admin/news/components/news-list-header/news-list-header.component';

@Component({
  selector   : 'external-biobio',
  standalone : true,
  imports    : [
    TranslocoDirective,
    NewsListHeaderComponent
  ],
  templateUrl: './external-biobio.component.html'
})
export class ExternalBiobioComponent implements OnInit {
  news: INews[] = [];

  constructor(private readonly _httpClient: HttpClient) {}

  async ngOnInit() {
    const response = await lastValueFrom(this._httpClient.get<IBioBioNews[]>('api/biobio'));

    response.map(bbn => {
      this.news.push({
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
        }
      });
    });
  }
}
