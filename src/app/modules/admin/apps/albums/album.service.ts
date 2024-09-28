import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map } from 'rxjs';
import { IAlbum }               from '@modules/admin/apps/albums/interfaces/album.interface';

@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    public albums$: BehaviorSubject<IAlbum[]> = new BehaviorSubject<IAlbum[]>(undefined);

    constructor(private readonly _httpClient: HttpClient) {
        this.getAlbums();
    }

    public getAlbums(): void {
        this._httpClient.get<IAlbum[]>('api/albums')
            .subscribe(content => {
                this.albums$.next(content);
            });
    }

    public getAlbum(id: string) {
        return this._httpClient.get<IAlbum>(`api/albums/${ id }`)
            .pipe(map(api => api));
    }
}
