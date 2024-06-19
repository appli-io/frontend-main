import { Component, OnInit }                      from '@angular/core';
import { PageHeaderComponent }                    from '@layout/components/page-header/page-header.component';
import { TranslocoDirective }                     from '@ngneat/transloco';
import { MatFormField }                           from '@angular/material/form-field';
import { MatIcon }                                from '@angular/material/icon';
import { MatInput }                               from '@angular/material/input';
import { MatIconButton }                          from '@angular/material/button';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { trackByFn }                              from '@libs/ui/utils/utils';
import { TitleCasePipe }                          from '@angular/common';
import { FuseConfirmationService }                from '../../../../../@fuse/services/confirmation';
import { UsersService }                           from '@modules/admin/admin/users/users.service';
import { CompanyUser }                            from '@modules/admin/admin/users/model/company-user.model';
import { takeUntilDestroyed }                     from '@angular/core/rxjs-interop';

@Component({
  selector   : 'app-users',
  standalone : true,
  imports    : [
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
  ],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  members: CompanyUser[];
  roles: any[];
  protected readonly trackByFn = trackByFn;

  constructor(
    private readonly _fuseConfirmationService: FuseConfirmationService,
    private readonly _usersService: UsersService
  ) {
    this._usersService.data$.pipe(takeUntilDestroyed()).subscribe((members) => {
      console.log('Members', members);
      this.members = members;
    });
  }

  ngOnInit(): void {
    // Setup the roles
    this.roles = [
      {
        label      : 'Read',
        value      : 'read',
        description:
          'Can read and clone this repository. Can also open and comment on issues and pull requests.',
      },
      {
        label      : 'Write',
        value      : 'write',
        description:
          'Can read, clone, and push to this repository. Can also manage issues and pull requests.',
      },
      {
        label      : 'Admin',
        value      : 'admin',
        description:
          'Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.',
      },
    ];
  }

  deleteMember(id): void {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title  : 'Remove member',
      message:
        'Are you sure you want to remove this member from the company? This action cannot be undone.',
      actions: {
        confirm: {
          label: 'Remove',
        },
      },
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Delete the list
        console.log('Delete member', id);
        // this._scrumboardService.deleteList(id).subscribe();
      }
    });
  }
}
