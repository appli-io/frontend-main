import { inject }                                                      from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { catchError, throwError }                                      from 'rxjs';

import { FilesLibraryService } from '@modules/admin/apps/files-library/files-library.service';
import { DetailsComponent }    from '@modules/admin/apps/files-library/pages/details/details.component';

const fileResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const filesService: FilesLibraryService = inject(FilesLibraryService);
  const router: Router = inject(Router);

  return filesService.findOne(route.params.id)
    .pipe(
      catchError((error) => {
        console.error(error);

        const parentUrl = state.url.split('/').slice(0, -1).join('/');

        router.navigateByUrl(parentUrl).then();

        return throwError(() => new Error(error));
      })
    );
};

const canDeactivateFileDetails = (
  component: DetailsComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot) => {
  let nextRoute: ActivatedRouteSnapshot = nextState.root;

  while (nextRoute.firstChild) {
    nextRoute = nextRoute.firstChild;
  }

  if (!nextState.url.includes('files-library')) return true;

  if (nextRoute.paramMap.get('id')) return true;

  return component.closeDrawer().then(() => true);
};


export default [
  {
    path         : '',
    loadComponent: () => import('./files-library.component').then(m => m.FilesLibraryComponent),
    children     : [
      {
        path         : '',
        loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent),
        children     : [
          {
            path         : ':id',
            loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent),
            resolve      : {
              file: fileResolver
            },
            canDeactivate: [ canDeactivateFileDetails ]
          }
        ]
      }
    ]
  }
] satisfies Routes;
