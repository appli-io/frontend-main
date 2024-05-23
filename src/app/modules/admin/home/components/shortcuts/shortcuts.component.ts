import { Component }                        from '@angular/core';
import { TranslocoDirective }               from '@ngneat/transloco';
import { JsonPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatIcon }                          from '@angular/material/icon';
import { RouterLink }                       from '@angular/router';
import { Shortcut }                         from '@modules/admin/home/components/shortcuts/shortcut.type';

@Component({
  selector   : 'home-shortcuts',
  standalone : true,
  imports    : [ TranslocoDirective, JsonPipe, MatIcon, NgIf, RouterLink, NgTemplateOutlet ],
  templateUrl: './shortcuts.component.html'
})
export class ShortcutsComponent {
  shortcuts: Shortcut[];

  constructor() {
    this.shortcuts = [
      {id: 'calendar', svgIcon: 'heroicons_solid:calendar', link: '/apps/calendar', useRouter: true},
      {id: 'mail', svgIcon: 'heroicons_solid:mail', link: 'https://google.com', useRouter: false},
      {id: 'security', svgIcon: 'heroicons_solid:key', link: '/apps/security', useRouter: true},
      {id: 'contacts', svgIcon: 'heroicons_solid:user-group', link: '/apps/contacts', useRouter: true}
    ];
  }
}
