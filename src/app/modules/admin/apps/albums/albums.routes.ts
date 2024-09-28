import { Routes }        from '@angular/router';
import { albumResolver } from '@modules/admin/apps/albums/resolvers/album.resolver';

export default [
    {
        path         : '',
        loadComponent: () => import('./albums.component').then(m => m.AlbumsComponent),
        children     : [
            {
                path         : '',
                loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
            },
            {
                path         : ':id',
                resolve      : {
                    album: albumResolver
                },
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent)
            }
        ]
    }
] as Routes;
