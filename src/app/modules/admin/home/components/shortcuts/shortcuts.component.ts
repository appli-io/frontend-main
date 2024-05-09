import { Component }          from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector   : 'app-shortcuts',
  standalone : true,
  imports    : [
    TranslocoDirective
  ],
  templateUrl: './shortcuts.component.html',
  styleUrl   : './shortcuts.component.scss'
})
export class ShortcutsComponent {

}
