import { Routes }        from '@angular/router';
import { albumResolver } from '@modules/admin/media/albums/resolvers/album.resolver';

export default [
  {
    path         : '',
    loadComponent: () => import('./albums.component').then(m => m.AlbumsComponent),
    children: [
      {
        path         : '',
        loadComponent: () => import('./pages/albums-list/albums-list.component').then(m => m.AlbumsListComponent)
      },
      {
        path         : ':id',
        resolve      : {
          album: albumResolver
        },
        loadComponent: () => import('./pages/albums-detail/albums-detail.component').then(m => m.AlbumsDetailComponent)
      }
    ]
  }
] as Routes;
