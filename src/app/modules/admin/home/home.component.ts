import { Component }                            from '@angular/core';
import { TranslocoDirective }                   from '@ngneat/transloco';
import { MatIcon }                              from '@angular/material/icon';
import { MatButton }                            from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatRipple }                            from '@angular/material/core';
import { INews }                                from '@modules/admin/news/domain/interfaces/news.interface';
import { ActivatedRoute }                       from '@angular/router';
import { IUser }                                from '@modules/admin/profile/interfaces/user.interface';

@Component({
  selector   : 'home',
  standalone : true,
  templateUrl: './home.component.html',
  imports    : [
    TranslocoDirective,
    MatIcon,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatRipple,
    MatMenuItem
  ]
})
export class HomeComponent {
  user: IUser;
  highlightedNews: INews[];
  assignedCompanies: any[];
  selectedCompany: any;


  constructor(private readonly route: ActivatedRoute) {
    console.log(route.snapshot.data);
    this.user = route.snapshot.data.user;
    this.highlightedNews = route.snapshot.data.highlightedNews;
    this.assignedCompanies = route.snapshot.data.assignedCompanies;
    this.selectedCompany = this.assignedCompanies[0] || undefined;
  }
}
