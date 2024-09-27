import { Component }                                           from '@angular/core';
import { DrawerContentComponent }                              from '../../../../shared/components/drawer-listing/components/drawer-content.component';
import { DrawerListingComponent }                              from '../../../../shared/components/drawer-listing/drawer-listing.component';
import { RouterOutlet }                                        from '@angular/router';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { PanelType }                                           from '../../../../shared/components/drawer-listing/panel.type';

@Component({
  selector   : 'app-user-settings',
  standalone : true,
  imports    : [
    DrawerContentComponent,
    DrawerListingComponent,
    RouterOutlet,
    TranslocoDirective,
    TranslocoPipe
  ],
  templateUrl: './user-settings.component.html'
})
export class UserSettingsComponent {
  panels: PanelType[];

  constructor(private readonly _translateService: TranslocoService) {
    this.panels = [
      {
        id         : 'personal-information',
        icon       : 'heroicons_outline:user',
        title      : this._translateService.translate('user.settings.personal-information.title'),
        description: this._translateService.translate('user.settings.personal-information.description'),
        link       : [ '/user', 'settings', 'personal-information' ]
      },
      {
        id         : 'password-update',
        icon       : 'heroicons_outline:key',
        title      : this._translateService.translate('user.settings.password-update.title'),
        description: this._translateService.translate('user.settings.password-update.description'),
        link       : [ '/user', 'settings', 'password-update' ]
      },
      {
        id         : 'contacts',
        icon       : 'heroicons_outline:at-symbol',
        title      : this._translateService.translate('user.settings.contacts.title'),
        description: this._translateService.translate('user.settings.contacts.description'),
        link       : [ '/user', 'settings', 'contacts' ]
      }
    ];
  }
}
