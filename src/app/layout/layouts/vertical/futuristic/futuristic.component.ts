import { Component, OnDestroy, OnInit, ViewEncapsulation }         from '@angular/core';
import { MatButtonModule }                                         from '@angular/material/button';
import { MatIconModule }                                           from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet }                    from '@angular/router';
import { FuseFullscreenComponent }                                 from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent }                                 from '@fuse/components/loading-bar';
import { FuseNavigationService, FuseVerticalNavigationComponent, } from '@fuse/components/navigation';
import { FuseMediaWatcherService }                                 from '@fuse/services/media-watcher';
import { NavigationService }                                       from 'app/core/navigation/navigation.service';
import { Navigation }                                              from 'app/core/navigation/navigation.types';
import { UserService }                                             from 'app/core/user/user.service';
import { LanguagesComponent }                                      from 'app/layout/components/languages/languages.component';
import { MessagesComponent }                                       from 'app/layout/components/messages/messages.component';
import { NotificationsComponent }                                  from 'app/layout/components/notifications/notifications.component';
import { QuickChatComponent }                                      from 'app/layout/components/quick-chat/quick-chat.component';
import { SearchComponent }                                         from 'app/layout/components/search/search.component';
import { ShortcutsComponent }                                      from 'app/layout/components/shortcuts/shortcuts.component';
import { UserComponent }                                           from 'app/layout/components/user/user.component';
import { Subject, takeUntil }                                      from 'rxjs';
import { IUser }                                                   from '@modules/admin/user/profile/interfaces/user.interface';

@Component({
    selector     : 'futuristic-layout',
    templateUrl  : './futuristic.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [
        FuseLoadingBarComponent,
        FuseVerticalNavigationComponent,
        UserComponent,
        MatButtonModule,
        MatIconModule,
        LanguagesComponent,
        FuseFullscreenComponent,
        SearchComponent,
        ShortcutsComponent,
        MessagesComponent,
        NotificationsComponent,
        RouterOutlet,
        QuickChatComponent,
    ],
})
export class FuturisticLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    user: IUser;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
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

        // Subscribe to the user service
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: IUser) => {
                this.user = user;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
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
}
