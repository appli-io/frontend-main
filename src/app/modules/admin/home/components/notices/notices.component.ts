import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import Splide                                                                  from '@splidejs/splide';
import { FuseCardComponent }                                                   from '../../../../../../@fuse/components/card';


@Component({
    selector     : 'home-notices',
    standalone   : true,
    imports      : [
        FuseCardComponent
    ],
    templateUrl  : './notices.component.html',
    encapsulation: ViewEncapsulation.None,
    schemas      : [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class NoticesComponent implements AfterViewInit {

    ngAfterViewInit() {
        setTimeout(() => {
            new Splide('#notices-slider', {
                direction  : 'ttb',
                type       : 'loop',
                height     : '20rem',
                autoplay   : false,
                interval   : 4 * 1_000,
                pagination : false,
                arrows     : false,
                breakpoints: {
                    640: {
                        height: '16rem'
                    },
                    480: {
                        height: '7rem'
                    }
                }
            }).mount();
        }, 0);
    }
}
