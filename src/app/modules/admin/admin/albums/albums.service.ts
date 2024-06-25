import { Injectable }                           from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { Api }         from '@core/interfaces/api';
import { IAlbum }      from '@modules/admin/apps/albums/interfaces/album.interface';
import { IAlbumImage } from '@modules/admin/apps/albums/interfaces/album-image.interface';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private _albums: BehaviorSubject<IAlbum[]> = new BehaviorSubject<IAlbum[]>(null);
  private _album: BehaviorSubject<IAlbum> = new BehaviorSubject<IAlbum>(null);

  constructor(private readonly _httpClient: HttpClient) { }

  get albums$(): Observable<IAlbum[]> {
    return this._albums.asObservable();
  }

  get album$(): Observable<IAlbum> {
    return this._album.asObservable();
  }

  public getAlbums(): Observable<IAlbum[]> {
    return this._httpClient.get<Api<IAlbum[]>>('api/albums')
      .pipe(
        map(apiResponse => apiResponse.content),
        tap(albums => this._albums.next(albums))
      );
  }

  public getAlbum(id: string): Observable<IAlbum> {
    return this._httpClient.get<Api<IAlbum>>(`api/albums/${ id }`)
      .pipe(
        map(apiResponse => apiResponse.content),
        tap(album => this._album.next(album))
      );
  }

  public postAlbum(album: { name: string, description: string, cover: File }): Observable<IAlbum> {
    const formData = new FormData();

    formData.append('name', album.name);
    formData.append('description', album.description);
    formData.append('cover', album.cover, album.cover.name);

    return this._httpClient.post<Api<IAlbum>>('api/albums', formData)
      .pipe(
        map(apiResponse => apiResponse.content),
        tap(newAlbum => this._albums.next([ newAlbum, ...this._albums.value ]))
      );
  }

  public putAlbum(id: string, album: { name: string, description: string, cover: File[] }): Observable<IAlbum> {
    const formData = new FormData();

    formData.append('name', album.name);
    formData.append('description', album.description);
    formData.append('cover', album.cover[0], album.cover[0].name);

    return this._httpClient.put<Api<IAlbum>>(`api/albums/${ id }`, formData)
      .pipe(
        map(apiResponse => apiResponse.content),
        tap(updatedAlbum => {
          this._albums.next(this._albums.value.map(album => album.id === updatedAlbum.id ? updatedAlbum : album));
        })
      );
  }

  public addImagesToAlbum(id: string, images: File[]): Observable<{ progress: number, response?: IAlbumImage[] }> {
    const formData = new FormData();

    images.forEach(image => formData.append('images', image, image.name));

    return this._httpClient.post<HttpEvent<Api<IAlbumImage[]>>>(`api/albums/${ id }/images`, formData, {
      reportProgress: true,
      observe     : 'events',
      responseType: 'json'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return {progress: event.total ? Math.round((100 * event.loaded) / event.total) : 0};
          case HttpEventType.ResponseHeader:
            return {};
          case HttpEventType.Response:
            return {progress: 100, response: event.body.content};
          default:
            return {progress: 0};
        }
      }),
      tap((response: { progress: number, response: IAlbumImage[] }) => {
        if (response.progress === 100 && response.response)
          this._album.next({...this._album.value, images: [ ...this._album.value.images, ...response.response ]});
      })
    );
  }

  public addImageToAlbum(id: string, image: File): Observable<{ progress: number, response?: IAlbumImage[] }> {
    return this.addImagesToAlbum(id, [ image ]);
  }

  public deleteAlbum(id: string): Observable<void> {
    return this._httpClient.delete<void>(`api/albums/${ id }`)
      .pipe(
        tap(() => this._albums.next(this._albums.value.filter(album => album.id !== id)))
      );
  }

  public deleteImage(albumId: string, imageId: string): Observable<void> {
    return this._httpClient.delete<void>(`api/albums/${ albumId }/images/${ imageId }`)
      .pipe(
        tap(() => this._album.next({
          ...this._album.value,
          images: this._album.value.images.filter(image => image.id !== imageId)
        }))
      );
  }
}
