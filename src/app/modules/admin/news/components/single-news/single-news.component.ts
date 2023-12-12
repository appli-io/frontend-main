import { Component }                  from '@angular/core';
import { CommonModule }               from '@angular/common';
import { MatButtonModule }            from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule }              from '@angular/material/icon';
import { CdkScrollable }              from '@angular/cdk/overlay';
import { INews }                      from '../../domain/interfaces/news.interface';
import { take }                       from 'rxjs';

@Component({
  selector: 'app-single-news',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, RouterLink, MatIconModule, CdkScrollable ],
  templateUrl: './single-news.component.html'
})
export class SingleNewsComponent {
  news: INews;

  // in the constructor, get object news from resolver
  constructor(private route: ActivatedRoute) {
    this.route.data
      .pipe(take(1))
      .subscribe((data: { resolvedNews: INews }) => {
        this.news = data.resolvedNews;
      });
  }
}
