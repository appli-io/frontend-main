import { Component }    from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector   : 'app-albums',
  standalone : true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './albums.component.html'
})
export class AlbumsComponent {

}
