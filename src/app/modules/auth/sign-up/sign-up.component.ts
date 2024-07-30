import { NgClass, NgIf }                                                                              from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation }                                            from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule }                                                                            from '@angular/material/button';
import { MatCheckboxModule }                                                                          from '@angular/material/checkbox';
import { MatFormFieldModule }                                                                         from '@angular/material/form-field';
import { MatIconModule }                                                                              from '@angular/material/icon';
import { MatInputModule }                                                                             from '@angular/material/input';
import { MatProgressSpinnerModule }                                                                   from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink }                                                         from '@angular/router';
import { fuseAnimations }                                                                             from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType }                                                          from '@fuse/components/alert';
import { AuthService }                                                                                from 'app/core/auth/auth.service';
import { emailAsyncValidator }                                                                        from '@modules/auth/sign-up/validators/valid-email.validator';

@Component({
  selector   : 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations,
  standalone : true,
  imports    : [ RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, NgClass ],
})
export class AuthSignUpComponent implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signUpForm: UntypedFormGroup;
  showAlert: boolean = false;

  constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signUpForm = this._loadForm();

    // Subscribe to the query params
    const queryParams = this._route.snapshot.queryParams;

    if (queryParams.token) {
      this.signUpForm.get('hasToken').setValue(true);
      this.signUpForm.get('token').setValue(queryParams.token);
    }

    this.signUpForm.get('hasToken').valueChanges.subscribe((hasToken: boolean) => {
      if (hasToken) {
        this._addCompanyFormGroup();
        this.signUpForm.get('token').setValidators([ Validators.required ]);
      } else {
        this._removeCompanyFormGroup();
        this.signUpForm.get('token').setValidators(null);
      }

      this.signUpForm.get('token').updateValueAndValidity();
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign up
   */
  signUp(): void {
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) return;


    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign up
    this._authService.signUp(this.signUpForm.value)
      .subscribe({
        next : (response) => {
          // Navigate to the confirmation required page
          this._router.navigateByUrl('/confirmation-required');
        },
        error: (response) => {
          // Re-enable the form
          this.signUpForm.enable();

          // Reset the form
          this.signUpNgForm.resetForm();

          // Set the alert
          this.alert = {
            type: 'error',
            message: 'Something went wrong, please try again.',
          };

          // Show the alert
          this.showAlert = true;
        }
      });
  }

  private _loadForm = (): UntypedFormGroup => this._formBuilder.group({
    name      : [ '', Validators.required ],
    email     : [ '', [ Validators.required, Validators.email ], [ emailAsyncValidator(this._authService) ] ],
    password  : [ '', Validators.required ],
    hasToken  : [ false ],
    token     : [ '' ],
    agreements: [ '', Validators.requiredTrue ],
    company   : this._addCompanyFormGroup()
  });

  private _addCompanyFormGroup = () => this._formBuilder.group({
    name      : [ '', Validators.required ],
    email     : [ '', Validators.required ],
    nationalId: [ '', Validators.required ],
    website   : [ '', Validators.required ],
    country   : [ '', Validators.required ],
  });

  private _removeCompanyFormGroup = () => {
    this.signUpForm.removeControl('company');
    this.signUpForm.updateValueAndValidity();
  };
}
