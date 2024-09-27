import { ChangeDetectionStrategy, ChangeDetectorRef, Component }                                   from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule }                                                                      from '@angular/material/form-field';
import { MatIcon }                                                                                 from '@angular/material/icon';

import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';

import { PageHeaderComponent }        from '@layout/components/page-header/page-header.component';
import { trackByFn }                  from '@libs/ui/utils/utils';
import { UserService }                from '@modules/admin/user/user.service';
import { MatInput }                   from '@angular/material/input';
import { NgClass }                    from '@angular/common';
import { MatButton, MatIconButton }   from '@angular/material/button';
import { MatTooltip }                 from '@angular/material/tooltip';
import { Country }                    from '@modules/admin/apps/contacts/contacts.types';
import { ContactsService }            from '@modules/admin/apps/contacts/contacts.service';
import { SubComponent }               from '@layout/components/sub-component/sub-component';
import { takeUntil }                  from 'rxjs';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { IUser }                      from '@modules/admin/user/profile/interfaces/user.interface';
import { takeUntilDestroyed }         from '@angular/core/rxjs-interop';
import { MatProgressSpinner }         from '@angular/material/progress-spinner';

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
        MatButton,
        MatSelectModule,
        MatOption,
        MatProgressSpinner,
        TranslocoPipe
    ],
    templateUrl    : './contacts.component.html'
})
export class ContactsComponent extends SubComponent {
    public form: UntypedFormGroup;
    public countries: Country[];
    public user: IUser;

    protected readonly trackByFn = trackByFn;

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _fb: UntypedFormBuilder,
        private readonly _ts: TranslocoService,
        private readonly _userService: UserService,
        private readonly _contactsService: ContactsService,
    ) {
        super();

        this.form = this._fb.group({
            emails : this._fb.array([]),
            numbers: this._fb.array([]),
            socials: this._fb.array([])
        });

        this._userService.user$
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (user: IUser) => {
                    this.user = user;

                    const emails = user.contacts.filter((contact) => contact.type === 'email');
                    const numbers = user.contacts.filter((contact) => contact.type === 'number');
                    const socials = user.contacts.filter((contact) => contact.type === 'social');

                    if (emails.length === 0 && this.form.get('emails')['controls'].length === 0) this.addEmailField(true, {
                        value: user.email,
                        label: 'Work'
                    });
                }
            });

        this._contactsService.countries$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((codes: Country[]) => {
                this.countries = codes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._changeDetectorRef.markForCheck();
    }

    public submit() {
    }

    public addEmailField(disabled: boolean = false, data: { value: string, label: string } = undefined): void {
        // Create an empty email form group
        const emailFormGroup = this._fb.group({
            value: [ {value: data?.value, disabled}, Validators.required ],
            label: [ data?.label, Validators.required ],
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

        // Mark for check
        this._changeDetectorRef.markForCheck();

    }

    public addPhoneNumberField(): void {
        // Create an empty phone number form group
        const phoneNumberFormGroup = this._fb.group({
            country    : [ 'cl', Validators.required ],
            phoneNumber: [ undefined, Validators.required ],
            label      : [ undefined, Validators.required ],
        });

        // Add the phone number form group to the phoneNumbers form array
        (this.form.get('numbers') as UntypedFormArray).push(phoneNumberFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    public removePhoneNumberField(index: number): void {
        // Get form array for phone numbers
        const phoneNumbersFormArray = this.form.get('numbers') as UntypedFormArray;

        // Remove the phone number field
        phoneNumbersFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    public addSocialField(): void {
        // Create an empty email form group
        const socialFormGroup = this._fb.group({
            value: [ undefined, Validators.required ],
            label: [ undefined, Validators.required ],
        });

        // Add the email form group to the emails form array
        (this.form.get('socials') as UntypedFormArray).push(socialFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    public removeSocialField(index: number): void {
        // Get form array for social accounts
        const socialsFormArray = this.form.get('socials') as UntypedFormArray;

        // Remove the phone number field
        socialsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    public getCountryByIso(iso: string): Country {
        return this.countries.find((country) => country.iso === iso);
    }
}
