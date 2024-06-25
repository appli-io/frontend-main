import { Component, OnInit }                                                     from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Notyf }                                                                 from 'notyf';
import { EventsService }                                                         from '../../events.service';
import { TranslocoDirective, TranslocoService }                                  from '@ngneat/transloco';
import { MatDialogRef }                                                          from '@angular/material/dialog';
import { takeUntil }                                                             from 'rxjs';
import { MatButton, MatIconButton }                                              from '@angular/material/button';
import { MatFormField, MatLabel }                                                from '@angular/material/form-field';
import { MatInputModule }                                                        from '@angular/material/input';
import { CdkTextareaAutosize }                                                   from '@angular/cdk/text-field';
import { NgForOf, NgIf }                                                         from '@angular/common';
import { MatIcon }                                                               from '@angular/material/icon';
import { MatProgressSpinner }                                                    from '@angular/material/progress-spinner';
import { MatCheckbox }                                                           from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle }                from '@angular/material/datepicker';

@Component({
  selector: "app-new",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslocoDirective,
    MatIcon,
    MatIconButton,
    MatLabel,
    MatFormField,
    MatInputModule,
    CdkTextareaAutosize,
    MatCheckbox,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatButton,
    MatProgressSpinner,
    NgIf,
    NgForOf
  ],
  templateUrl: "./new.component.html",
})
export class NewComponent implements OnInit {
  eventForm: UntypedFormGroup;
  notyf = new Notyf();
  

  constructor(
    public readonly _matDialogRef: MatDialogRef<NewComponent>,
    private readonly _translocoService: TranslocoService,
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.eventForm = this._formBuilder.group({
      title: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      isAllDay: [false, [Validators.required]],
      startDate: [undefined, [Validators.required]],
      endDate: [undefined],
      location: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      url: this._formBuilder.array([]),
      image: [undefined],
      capacity: [undefined],
      organizer: this._formBuilder.group({
        name: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        email: [undefined, [Validators.required, Validators.email]],
        phone: this._formBuilder.group({
          countryCode: [undefined, [Validators.required]],
          number: [undefined, [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
        }),
      }),
      type: [undefined, [Validators.required]],
      status: [undefined, [Validators.required]],
    });
  }

  get urlArray(): UntypedFormArray {
    return this.eventForm.get('url') as UntypedFormArray;
  }

  addUrl(): void {
    const urlGroup = this._formBuilder.group({
      label: [undefined, Validators.required],
      url: [undefined, Validators.required],
      platform: [undefined, Validators.required],
    });
    this.urlArray.push(urlGroup);
  }

  removeUrl(index: number): void {
    this.urlArray.removeAt(index);
  }

  discard(): void {
    this._matDialogRef.close();
  }

  save(): void {
    if (this.eventForm.valid) {
      this.eventForm.disable();

      try {
        this._eventsService
          .createEvent(this.eventForm.getRawValue())
          .pipe(takeUntil(this._matDialogRef.afterClosed()))
          .subscribe({
            next: (result) => {
              this._matDialogRef.close(result);
            },
            error: (error) => {
              this.notyf.error({
                message: this._translocoService.translate("errors.service.message"),
                position: { x: "right", y: "top" },
              });
              this.eventForm.enable();
            },
          });
      } catch (error) {
        this.notyf.error({
          message: this._translocoService.translate("errors.runtime.message"),
          position: { x: "right", y: "top" },
        });
        this.eventForm.enable();
      }
    }
  }

  remove() {
    console.log('remove')
  }
}
