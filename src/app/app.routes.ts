import { Route }               from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard }           from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard }         from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent }     from 'app/layout/layout.component';

export const appRoutes: Route[] = [

  // Redirect empty path to '/example'
  {path: '', pathMatch: 'full', redirectTo: 'home'},

  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'home'},

  // Auth routes for guests
  {
    path       : '',
    canActivate: [ NoAuthGuard ],
    canActivateChild: [ NoAuthGuard ],
    component  : LayoutComponent,
    data       : {
      layout: 'empty'
    },
    children   : [
      {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
      {path: 'confirm/:token', loadChildren: () => import('app/modules/auth/confirm/confirm.routes')},
      {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
      {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
      {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
      {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
    ]
  },

  // Auth routes for authenticated users
  {
    path       : '',
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
    component  : LayoutComponent,
    data       : {
      layout: 'empty'
    },
    children   : [
      {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
      {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
    ]
  },

  // No company affiliation guard
  // {
  //   path: '',
  //   canActivate: [ HasCompanyAffiliationGuard ],
  //   canActivateChild: [ HasCompanyAffiliationGuard ],
  //   component: LayoutComponent,
  //   data: {
  //     layout: 'empty'
  //   },
  //   children: [
  //     {path: 'company-affiliation-required', loadChildren: () => import('app/modules/auth/company-affiliation-required/company-affiliation-required.routes')}
  //   ]
  // },


  // Landing routes
  {
    path    : '',
    component: LayoutComponent,
    data    : {
      layout: 'empty'
    },
    children: [
      {path: 'homs', loadChildren: () => import('app/modules/landing/home/home.routes')},
    ]
  },

  // Admin routes
  {
    path       : '',
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
    component  : LayoutComponent,
    resolve    : {
      initialData: initialDataResolver
    },
    children   : [
      {path: 'home', loadChildren: () => import('app/modules/admin/home/home.routes')},
      {path: 'profile', loadChildren: () => import('app/modules/admin/profile/profile.routes')},
      {path: 'news', loadChildren: () => import('app/modules/admin/news/news.routes')},
      {
        path    : 'apps',
        children: [
          {path: 'contacts', loadChildren: () => import('@modules/admin/apps/contacts/contacts.routes')},
          {path: 'albums', loadChildren: () => import('@modules/admin/apps/albums/albums.routes')},
          {path: 'scrumboards', loadChildren: () => import('app/modules/admin/apps/scrumboard/scrumboard.routes')},
          {path: 'benefits', loadChildren: () => import('app/modules/admin/apps/benefits/benefits.routes')},
          {path: '', redirectTo: '/home', pathMatch: 'full'}
        ]
      },
      {
        path    : 'admin',
        children: [
          {path: 'news', loadChildren: () => import('app/modules/admin/admin/news/news.routes')},
          {path: 'albums', loadChildren: () => import('app/modules/admin/admin/albums/albums.routes')},
          {path: 'users', loadChildren: () => import('app/modules/admin/admin/users/users.routes')},
          {path: 'events', loadChildren: () => import('app/modules/admin/admin/events/events.routes')}
        ]
      }
    ]
  }
];
