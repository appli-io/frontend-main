import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, DOCUMENT, I18nPluralPipe, NgClass, NgForOf, NgIf }                                 from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormControl }                                        from '@angular/forms';
import { MatDrawer, MatDrawerContainer, MatDrawerContent }                                             from '@angular/material/sidenav';
import { MatFormField, MatPrefix }                                                                     from '@angular/material/form-field';
import { MatIcon }                                                                                     from '@angular/material/icon';
import { MatInput }                                                                                    from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink, RouterOutlet }                                            from '@angular/router';

import { TranslocoDirective }                              from '@ngneat/transloco';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { PageHeaderComponent }     from '@layout/components/page-header/page-header.component';
import { BenefitsTableComponent }  from '@modules/admin/admin/benefits/components/benefits-table/benefits-table.component';
import { trackByFn }               from '@libs/ui/utils/utils';
import { fakerES }                 from '@faker-js/faker';
import { ImgFallbackDirective } from '@core/directives/imgFallback.directive';


@Component({
  selector       : 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone     : true,
  imports: [
    BenefitsTableComponent,
    PageHeaderComponent,
    TranslocoDirective,
    AsyncPipe,
    FormsModule,
    I18nPluralPipe,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatFormField,
    MatIcon,
    MatInput,
    MatPrefix,
    NgForOf,
    NgIf,
    RouterOutlet,
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    ImgFallbackDirective
  ],
  templateUrl    : './list.component.html',
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

  drawerMode: 'side' | 'over';
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  private _files$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this._loadFakeFiles().sort((a, b) => a.mimetype.localeCompare(b.mimetype)));
  private _selectedFile: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  protected readonly trackByFn = trackByFn;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  ) {}

  get selectedFile(): any {
    return this._selectedFile;
  }

  set selectedFile(value: any) {
    this._selectedFile = value;

    this._changeDetectorRef.markForCheck();
    console.log('marking for check');
  }

  get files$(): Observable<any[]> {
    return this._files$.asObservable();
  }

  ngOnInit() {
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({matchingAliases}) => {
        // Set the drawerMode if the given breakpoint is active
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
        } else {
          this.drawerMode = 'over';
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onBackdropClicked(): void {
    // Go back to the list
    this._router.navigate([ './' ], {relativeTo: this._activatedRoute});

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  t(s: any) {
    console.log(s);
    return s;
  }

  selectFile(file: any) {
    if (this.selectedFile && this.selectedFile.id === file.id) {
      return;
    }

    if (this.selectedFile) {
      this._router.navigate([ 'apps/files-library' ]).then(() => this._router.navigate([ file.id ], {relativeTo: this._activatedRoute}));
    } else {
      this._router.navigate([ file.id ], {relativeTo: this._activatedRoute});
    }


  }

  private _loadFakeFiles() {
    const files = [];
    Array.from({length: 100}).forEach(() => {
      files.push({
        id      : fakerES.string.uuid(),
        fileUrl : fakerES.internet.url(),
        fileName: fakerES.system.fileName(),
        size    : fakerES.number.int({min: 100, max: 100000}),
        mimetype: fakerES.system.commonFileExt(),
      });
    });

    return files;
  }
}
