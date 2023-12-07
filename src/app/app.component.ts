import { Component }       from '@angular/core';
import { RouterOutlet }    from '@angular/router';
import { DatabaseService } from '../@fuse/services/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  standalone: true,
  imports: [ RouterOutlet ],
  providers: [ DatabaseService ]
})
export class AppComponent {
  /**
   * Constructor
   */
  constructor(private databaseService: DatabaseService) {

  }
}
