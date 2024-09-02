import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet }                       from '@angular/router';

@Component({
  selector       : 'app-files-library',
  standalone     : true,
  imports        : [
    RouterOutlet
  ],
  templateUrl    : './files-library.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesLibraryComponent {

}
