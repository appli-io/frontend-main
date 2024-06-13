import { Injectable }             from '@angular/core';
import { HttpClient }             from '@angular/common/http';
import { BehaviorSubject, delay } from 'rxjs';
import { IAlbum }                 from '@modules/admin/media/albums/interfaces/album.interface';
import { Api }                    from '@core/interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public albums$: BehaviorSubject<IAlbum[]> = new BehaviorSubject<IAlbum[]>(undefined);

  constructor(private readonly _httpClient: HttpClient) {
    this.getAlbums();
  }

  public getAlbums(): void {
    this._httpClient.get<Api<IAlbum[]>>('api/albums')
      .pipe(delay(10000))
      .subscribe(api => {
        this.albums$.next(api.content);
      });
  }
}
