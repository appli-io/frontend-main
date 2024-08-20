import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatePipe, NgForOf, NgIf }                   from '@angular/common';
import { RouterLink }                                from '@angular/router';
import { MatIcon }                                   from '@angular/material/icon';
import { MatDivider }                                from '@angular/material/divider';
import { MatButton }                                 from '@angular/material/button';
import { MatTooltip }                                from '@angular/material/tooltip';
import { IFile }                                     from '@modules/admin/news/domain/interfaces/news.interface';
import { IUser }                                     from '@modules/admin/profile/interfaces/user.interface';

@Component({
  selector       : 'page-detail-header',
  standalone     : true,
  imports        : [
    NgForOf,
    RouterLink,
    MatIcon,
    MatDivider,
    DatePipe,
    MatButton,
    MatTooltip,
    NgIf
  ],
  templateUrl    : './page-detail-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageDetailHeaderComponent {
  @Input() breadcrumbs: { label: string, url: string }[];
  @Input() title: string;
  @Input() subtitle: string;
  @Input() portraitImage: IFile;
  @Input() createdBy: IUser;
  @Input() date: Date;
}
