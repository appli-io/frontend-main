import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AsyncPipe }                                                                from '@angular/common';
import { MatButtonModule }                                                          from '@angular/material/button';
import { MatIconModule }                                                            from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet }                                     from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { FuseFullscreenComponent }                                 from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent }                                 from '@fuse/components/loading-bar';
import { FuseNavigationService, FuseVerticalNavigationComponent, } from '@fuse/components/navigation';
import { FuseConfigService }                                       from '@fuse/services/config';
import { FuseMediaWatcherService }                                 from '@fuse/services/media-watcher';
import { CompanySelectorComponent }                                from '@layout/components/company-selector/company-selector.component';
import { NavigationService }                                       from 'app/core/navigation/navigation.service';
import { Navigation }                                              from 'app/core/navigation/navigation.types';
import { LanguagesComponent }                                      from 'app/layout/components/languages/languages.component';
import { MessagesComponent }                                       from 'app/layout/components/messages/messages.component';
import { NotificationsComponent }                                  from 'app/layout/components/notifications/notifications.component';
import { QuickChatComponent }                                      from 'app/layout/components/quick-chat/quick-chat.component';
import { SearchComponent }                                         from 'app/layout/components/search/search.component';
import { ShortcutsComponent }                                      from 'app/layout/components/shortcuts/shortcuts.component';
import { UserComponent }                                           from 'app/layout/components/user/user.component';

@Component({
    selector       : 'dense-layout',
    templateUrl    : './dense.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        FuseLoadingBarComponent,
        FuseVerticalNavigationComponent,
        MatButtonModule,
        MatIconModule,
        LanguagesComponent,
        FuseFullscreenComponent,
        SearchComponent,
        ShortcutsComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        RouterOutlet,
        QuickChatComponent,
        CompanySelectorComponent,
        AsyncPipe,
    ],
})
export class DenseLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    isDarkMode: boolean;
    navigation: Navigation;
    navigationAppearance: 'default' | 'dense' = 'dense';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public _fuseConfigService: FuseConfigService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');

                // Change the navigation appearance
                this.navigationAppearance = this.isScreenSmall
                    ? 'default'
                    : 'dense';
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    /**
     * Toggle the navigation appearance
     */
    toggleNavigationAppearance(): void {
        this.navigationAppearance =
            this.navigationAppearance === 'default' ? 'dense' : 'default';
    }
}
