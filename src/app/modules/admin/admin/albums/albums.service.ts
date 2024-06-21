import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { Api }    from '@core/interfaces/api';
import { IAlbum } from '@modules/admin/apps/albums/interfaces/album.interface';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private _albums: BehaviorSubject<IAlbum[]> = new BehaviorSubject<IAlbum[]>(null);

  constructor(private readonly _httpClient: HttpClient) { }

  get albums$(): Observable<IAlbum[]> {
    return this._albums.asObservable();
  }

  public getAlbums(): Observable<IAlbum[]> {
    return this._httpClient.get<Api<IAlbum[]>>('api/albums')
      .pipe(
        map(apiResponse => apiResponse.content),
        tap(albums => this._albums.next(albums))
      );
  }
}
