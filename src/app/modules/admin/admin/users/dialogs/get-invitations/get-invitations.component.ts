import { Component, OnDestroy, OnInit }         from '@angular/core';
import { CommonModule, JsonPipe, NgIf }         from '@angular/common';
import { MatDialogModule, MatDialogRef }        from '@angular/material/dialog';
import { UsersService }                         from '@modules/admin/admin/users/users.service';
import { MatButtonModule }                      from '@angular/material/button';
import { Table }                                from '@modules/shared/components/table/table.component';
import { MatTableModule }                       from '@angular/material/table';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { CompanyUser, InvitationsResponse }     from '../../model/company-user.model';
import { MatIconModule }                        from '@angular/material/icon';

import { Notyf }                    from 'notyf';
import { takeUntil }                from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-get-invitations',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    NgIf,
    Table,
    MatTableModule,
    TranslocoDirective,
    JsonPipe,
    MatIconModule
  ],
  templateUrl: './get-invitations.component.html'
})
export class GetInvitationsComponent implements OnInit, OnDestroy {
  public invitations$: BehaviorSubject<CompanyUser[]> = new BehaviorSubject<CompanyUser[]>([]);
  public readonly displayedColumns: string[] = [
    'email',
    'joined',
    // 'actions'
  ];
  private _destroyed$ = new Subject<void>();
  private _notyf = new Notyf();

  constructor(
    private readonly _usersService: UsersService,
    private readonly _translocoService: TranslocoService,
    public dialogRef: MatDialogRef<GetInvitationsComponent>
  ) { }

  ngOnInit(): void {
    this._usersService.getInvitations()
      .pipe(takeUntil(this._destroyed$))
      .subscribe((response: InvitationsResponse) => {
        const invitations = response.content;
        this.invitations$.next(invitations);
        console.log('Invitations:', invitations);
      }, error => {
        console.error('Error fetching invitations:', error);
      });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  close(): void {
    this.dialogRef.close();
  }

  // resendInvitation(invitationId: string): void {
  //   this._usersService.resendInvitation(invitationId).pipe(takeUntil(this._destroyed$)).subscribe({
  //     next: () => {
  //       this._notyf.success(this._translocoService.translate('admin.users.invitations.resendSuccess'));
  //     },
  //     error: (error) => {
  //       this._notyf.error(error.message);
  //     }
  //   });
  // }
}
