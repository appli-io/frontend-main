import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@layout/components/page-header/page-header.component';
import { TranslocoDirective } from '@ngneat/transloco';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { trackByFn } from '@libs/ui/utils/utils';
import { TitleCasePipe } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UsersService } from '@modules/admin/admin/users/users.service';
import { CompanyUser } from '@modules/admin/admin/users/model/company-user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MemberNewComponent } from '@modules/admin/admin/users/dialogs/member-new/member-new.component';
import { rolesList } from '@core/constants';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { GetInvitationsComponent } from './dialogs/get-invitations/get-invitations.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    PageHeaderComponent,
    TranslocoDirective,
    MatFormField,
    MatIcon,
    MatInput,
    MatIconButton,
    MatSelect,
    MatSelectTrigger,
    MatOption,
    TitleCasePipe,
    MatIconAnchor,
    MatTooltip,
    ReactiveFormsModule
  ],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  members: CompanyUser[];
  roles: any[];
  protected readonly trackByFn = trackByFn;
  public searchControl = new FormControl('');
  public filteredMembers$ = new BehaviorSubject<CompanyUser[]>([]);

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _matDialog: MatDialog,
    private readonly _usersService: UsersService
  ) {
    this._subscribeToSearchControl();
    this._usersService.data$.pipe(takeUntilDestroyed()).subscribe((members) => {
      console.log('Members', members);
      this.members = members;
      this.filteredMembers$.next(members);
    });
  }

  ngOnInit(): void {
    this.roles = rolesList;
  }

  deleteMember(id): void {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Remove member',
      message: 'Are you sure you want to remove this member from the company? This action cannot be undone.',
      actions: {
        confirm: { label: 'Remove' },
      },
    });

    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        console.log('Delete member', id);
        // this._scrumboardService.deleteList(id).subscribe();
      }
    });
  }

  openNewMemberDialog() {
    this._matDialog.open(MemberNewComponent, {
      panelClass: 'dialog-mobile-fullscreen',
    });
  }

  openInvitationsDialog() {
    this._matDialog.open(GetInvitationsComponent, {
      panelClass: 'dialog-mobile-fullscreen',
    });
  }

  private _subscribeToSearchControl() {
    this.searchControl.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value) => this._usersService.getMembers({ query: { name: value } }))
    ).subscribe((filteredMembers) => {
      this.filteredMembers$.next(filteredMembers.content);
    });
  }
}
