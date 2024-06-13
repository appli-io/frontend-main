import { Component, Input } from '@angular/core';
import { IAlbum }           from '@modules/admin/media/albums/interfaces/album.interface';
import { DatePipe, NgIf }   from '@angular/common';
import { MatIcon }          from '@angular/material/icon';
import { MatBadge }         from '@angular/material/badge';

@Component({
  selector   : 'album-card',
  standalone : true,
  imports: [
    NgIf,
    MatIcon,
    MatBadge,
    DatePipe
  ],
  templateUrl: './album-card.component.html'
})
export class AlbumCardComponent {
  @Input() album: IAlbum;
  @Input() index: number;
}
