import { Component }    from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector   : 'app-benefits',
    standalone : true,
    imports    : [
        RouterOutlet
    ],
    templateUrl: './benefits.component.html'
})
export class BenefitsComponent {

}
