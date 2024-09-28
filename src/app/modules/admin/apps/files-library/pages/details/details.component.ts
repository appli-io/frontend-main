import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ListComponent }                                                            from '@modules/admin/apps/files-library/pages/list/list.component';
import { FilesLibraryService }                                                      from '@modules/admin/apps/files-library/files-library.service';
import { Subject }                                                                  from 'rxjs';
import { ActivatedRoute, RouterLink }                                               from '@angular/router';
import { MatDrawerToggleResult }                                                    from '@angular/material/sidenav';
import { MatIcon }                                                                  from '@angular/material/icon';
import { MatButton, MatIconAnchor, MatIconButton }                                  from '@angular/material/button';
import { MatTooltip }                                                               from '@angular/material/tooltip';

@Component({
    selector       : 'app-details',
    standalone     : true,
    imports        : [
        MatIcon,
        MatIconButton,
        MatButton,
        MatIconAnchor,
        MatTooltip,
        RouterLink
    ],
    templateUrl    : './details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _filesListComponent: ListComponent,
        private _filesService: FilesLibraryService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._filesListComponent.selectedFile = {id: this._route.snapshot.params.id};
        // Open the drawer
        this._filesListComponent.matDrawer.open();
        this._changeDetectorRef.markForCheck();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    closeDrawer(): Promise<MatDrawerToggleResult> {
        this._filesListComponent.selectedFile = null;
        this._changeDetectorRef.markForCheck();
        return this._filesListComponent.matDrawer.close();
    }
}
