import { Component }                from '@angular/core';
import { TranslocoDirective }       from '@ngneat/transloco';
import { PageHeaderComponent }      from '../../../../../../layout/common/page-header/page-header.component';
import { FuseCardComponent }        from '@fuse/components/card';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon }                  from '@angular/material/icon';
import { RouterLink }               from '@angular/router';
import { IAlbum }                   from '@modules/admin/media/albums/interfaces/album.interface';
import { AlbumCardComponent }       from '@modules/admin/media/albums/components/album-card/album-card.component';
import { BehaviorSubject }          from 'rxjs';
import { AlbumService }             from '@modules/admin/media/albums/album.service';
import { AsyncPipe }                from '@angular/common';

@Component({
  selector   : 'app-albums-list',
  standalone : true,
  imports    : [ TranslocoDirective, PageHeaderComponent, FuseCardComponent, MatIconButton, MatIcon, MatAnchor, RouterLink, AlbumCardComponent, AsyncPipe ],
  templateUrl: './albums-list.component.html'
})
export class AlbumsListComponent {
  albums: BehaviorSubject<IAlbum[]>;

  constructor(private readonly _albumService: AlbumService) {
    this.albums = this._albumService.$albums;
  }
}
