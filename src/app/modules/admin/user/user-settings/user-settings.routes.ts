import { Routes }          from '@angular/router';
import { inject }          from '@angular/core';
import { MemberService }   from '@modules/admin/user/member.service';
import { ContactsService } from '@modules/admin/apps/contacts/contacts.service';

export default [
    {
        path         : '',
        loadComponent: () => import('./user-settings.component').then(m => m.UserSettingsComponent),
        children     : [
            {
                path         : 'personal-information',
                resolve      : {
                    user: () => inject(MemberService).getCurrentUser()
                },
                loadComponent: () => import('./pages/personal-information/personal-information.component').then(m => m.PersonalInformationComponent),
            },
            {
                path         : 'password-update',
                loadComponent: () => import('./pages/password-update/password-update.component').then(m => m.PasswordUpdateComponent),
            },
            {
                path         : 'contacts',
                resolve      : {
                    user: () => inject(MemberService).getCurrentUser(),
                    contacts: () => inject(ContactsService).getCountries()
                },
                loadComponent: () => import('./pages/contacts/contacts.component').then(m => m.ContactsComponent),
            },
            {path: '**', pathMatch: 'full', redirectTo: 'personal-information'},
        ]
    }
] satisfies Routes;
