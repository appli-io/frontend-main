import { Component, Input } from '@angular/core';
import { IAlbum }           from '@modules/admin/media/albums/interfaces/album.interface';
import { NgIf }             from '@angular/common';

@Component({
  selector   : 'album-card',
  standalone : true,
  imports    : [
    NgIf
  ],
  templateUrl: './album-card.component.html'
})
export class AlbumCardComponent {
  @Input() album: IAlbum;
  @Input() index: number;
}
