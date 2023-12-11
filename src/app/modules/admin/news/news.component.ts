import { Component }    from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector   : 'app-news',
  standalone : true,
  imports    : [ CommonModule, RouterOutlet ],
  templateUrl: './news.component.html',
  styleUrl   : './news.component.scss'
})
export class NewsComponent {

}
