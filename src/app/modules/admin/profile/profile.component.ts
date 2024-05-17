import { TextFieldModule }                                       from '@angular/cdk/text-field';
import { NgClass, NgIf }                                         from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule }                                       from '@angular/material/button';
import { MatDividerModule }                                      from '@angular/material/divider';
import { MatFormFieldModule }                                    from '@angular/material/form-field';
import { MatIconModule }                                         from '@angular/material/icon';
import { MatInputModule }                                        from '@angular/material/input';
import { MatMenuModule }                                         from '@angular/material/menu';
import { MatTooltipModule }                                      from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink, RouterLinkActive }          from '@angular/router';
import { FuseCardComponent }                                     from '@fuse/components/card';
import { IUser }                                                 from '@modules/admin/profile/interfaces/user.interface';
import { TranslocoDirective }                                    from '@ngneat/transloco';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ RouterLink, FuseCardComponent, MatIconModule, MatButtonModule, MatMenuModule, MatFormFieldModule, MatInputModule, TextFieldModule, MatDividerModule, MatTooltipModule, NgClass, TranslocoDirective, RouterLinkActive, NgIf ],
})
export class ProfileComponent {
  private readonly _user: IUser;

  constructor(private _route: ActivatedRoute) {
    this._user = this._route.snapshot.data.resolvedUser;
  }

  get user(): IUser {
    return this._user;
  }
}
