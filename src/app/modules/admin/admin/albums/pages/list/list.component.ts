import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';

import { TranslocoDirective } from '@ngneat/transloco';

import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PageHeaderComponent }     from '@layout/components/page-header/page-header.component';
import { AlbumsService }           from '@modules/admin/admin/albums/albums.service';
import { AlbumsTableComponent }    from '@modules/admin/admin/albums/components/albums-table/albums-table.component';
import { IAlbum }                  from '@modules/admin/apps/albums/interfaces/album.interface';
import { RouterLink }              from '@angular/router';

@Component({
  selector   : 'app-list',
  standalone : true,
  imports: [
    PageHeaderComponent,
    TranslocoDirective,
    AlbumsTableComponent,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './list.component.html'
})
export class ListComponent {
  public albums$ = this._albumsService.albums$;

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _albumsService: AlbumsService
  ) {}

  editAlbum(album: IAlbum) {
    console.log('Edit album', album);
  }

  deleteAlbum(album: IAlbum) {
    console.log('Delete album', album);
    const confirmation = this._fuseConfirmationService.open({
      title  : 'Delete album',
      message:
        'Are you sure you want to delete the album? This action cannot be undone.',
      actions: {
        confirm: {
          label: 'Delete',
        },
      },
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Delete the list
        console.log('Delete member', album.id);
        // this._scrumboardService.deleteList(id).subscribe();
      }
    });
  }

  pageChange(event: any) {
    console.log('Page change', event);
  }
}
