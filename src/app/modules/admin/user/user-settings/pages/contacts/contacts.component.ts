import { ChangeDetectionStrategy, ChangeDetectorRef, Component }                       from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatFormFieldModule }                                                          from '@angular/material/form-field';
import { MatIcon }                                                                     from '@angular/material/icon';

import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';

import { PageHeaderComponent }      from '@layout/components/page-header/page-header.component';
import { trackByFn }                from '@libs/ui/utils/utils';
import { UserService }              from '@modules/admin/user/user.service';
import { MatInput }                 from '@angular/material/input';
import { NgClass }                  from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTooltip }               from '@angular/material/tooltip';

@Component({
  selector       : 'app-contacts',
  standalone     : true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports        : [
    TranslocoDirective,
    PageHeaderComponent,
    MatIcon,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    NgClass,
    MatIconButton,
    MatTooltip,
    MatButton
  ],
  templateUrl    : './contacts.component.html'
})
export class ContactsComponent {
  public form: UntypedFormGroup;

  protected readonly trackByFn = trackByFn;

  constructor(
    private readonly _fb: UntypedFormBuilder,
    private readonly _userService: UserService,
    private readonly _ts: TranslocoService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = this._fb.group({
      emails : this._fb.array([]),
      numbers: this._fb.array([]),
    });
  }

  public addEmailField(): void {
    // Create an empty email form group
    const emailFormGroup = this._fb.group({
      email: [ '' ],
      label: [ '' ],
    });

    // Add the email form group to the emails form array
    (this.form.get('emails') as UntypedFormArray).push(emailFormGroup);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  public removeEmailField(index: number): void {
    // Get form array for emails
    const emailsFormArray = this.form.get('emails') as UntypedFormArray;

    // Remove the email field
    emailsFormArray.removeAt(index);

    // Mark for check this._changeDetectorRef.markForCheck();

  }
}
