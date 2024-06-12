import { Injectable }      from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IAlbum }          from '@modules/admin/media/albums/interfaces/album.interface';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public $albums: BehaviorSubject<IAlbum[]> = new BehaviorSubject<IAlbum[]>(undefined);

  constructor(private readonly _httpClient: HttpClient) {
    this.getAlbums();
  }

  public getAlbums(): void {
    this._httpClient.get<IAlbum[]>('api/albums').subscribe(albums => {
      this.$albums.next(albums);
    });
  }
}
