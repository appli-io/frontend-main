import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ListComponent }                                   from '@modules/admin/apps/files-library/pages/list/list.component';
import { FilesLibraryService }                             from '@modules/admin/apps/files-library/files-library.service';
import { Subject }                                         from 'rxjs';
import { ActivatedRoute, RouterLink }                      from '@angular/router';
import { MatDrawerToggleResult }                           from '@angular/material/sidenav';

@Component({
  selector   : 'app-details',
  standalone : true,
  imports    : [
    RouterLink
  ],
  templateUrl: './details.component.html'
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
    console.log(this._filesListComponent.selectedFile);
    // Open the drawer
    console.log(this._filesListComponent);
    this._filesListComponent.matDrawer.open();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._filesListComponent.matDrawer.close();
  }
}
