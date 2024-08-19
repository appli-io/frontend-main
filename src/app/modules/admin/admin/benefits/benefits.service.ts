import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { Api }             from '@core/interfaces/api';
import { IAlbum }          from '@modules/admin/apps/albums/interfaces/album.interface';
import { BenefitCategory } from '@modules/admin/admin/benefits/models/benefit-category';

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {
  private _categories$: BehaviorSubject<BenefitCategory[]> = new BehaviorSubject<BenefitCategory[]>(null);

  constructor(private readonly _httpClient: HttpClient) { }

  private _benefits$: BehaviorSubject<IAlbum[]> = new BehaviorSubject<IAlbum[]>(null);

  get benefits$(): Observable<IAlbum[]> {
    return this._benefits$.asObservable();
  }

  private _benefit$: BehaviorSubject<IAlbum> = new BehaviorSubject<IAlbum>(null);

  get benefit$(): Observable<IAlbum> {
    return this._benefit$.asObservable();
  }

  public getAll(): Observable<IAlbum[]> {
    return this._httpClient.get<Api<IAlbum[]>>('api/benefits/benefit')
      .pipe(
        map(apiResponse => apiResponse.content),
        tap(albums => this._benefits$.next(albums))
      );
  }

  public getOne(id: string): Observable<IAlbum> {
    return this._httpClient.get<Api<IAlbum>>(`api/benefits/benefit/${ id }`)
      .pipe(
        map(apiResponse => apiResponse.content),
        tap(album => this._benefit$.next(album))
      );
  }

  public create(album: { name: string, description: string, cover: File }): Observable<IAlbum> {
    const formData = new FormData();

    formData.append('name', album.name);
    formData.append('description', album.description);
    formData.append('cover', album.cover, album.cover.name);

    return this._httpClient.post<Api<IAlbum>>('api/albums', formData)
      .pipe(
        map(apiResponse => apiResponse.content),
        tap(newAlbum => this._benefits$.next([ newAlbum, ...this._benefits$.value ]))
      );
  }

  public update(id: string, album: { name: string, description: string, cover: File[] }): Observable<IAlbum> {
    const formData = new FormData();

    formData.append('name', album.name);
    formData.append('description', album.description);
    formData.append('cover', album.cover[0], album.cover[0].name);

    return this._httpClient.put<Api<IAlbum>>(`api/albums/${ id }`, formData)
      .pipe(
        map(apiResponse => apiResponse.content),
        tap(updatedAlbum => {
          this._benefits$.next(this._benefits$.value.map(album => album.id === updatedAlbum.id ? updatedAlbum : album));
        })
      );
  }

  public delete(id: string): Observable<void> {
    return this._httpClient.delete<void>(`api/albums/${ id }`)
      .pipe(
        tap(() => this._benefits$.next(this._benefits$.value.filter(album => album.id !== id)))
      );
  }

  public deleteImage(albumId: string, imageId: string): Observable<void> {
    return this._httpClient.delete<void>(`api/albums/${ albumId }/images/${ imageId }`)
      .pipe(
        tap(() => this._benefit$.next({
          ...this._benefit$.value,
          images: this._benefit$.value.images.filter(image => image.id !== imageId)
        }))
      );
  }
}
