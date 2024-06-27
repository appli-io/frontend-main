import { Component, OnInit }                                                                       from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Notyf }                                                                                   from 'notyf';
import { EventsService }                                                                           from '../../events.service';
import { TranslocoDirective, TranslocoService }                                                    from '@ngneat/transloco';
import { MatDialogRef }                                                                            from '@angular/material/dialog';
import { takeUntil }                                                                               from 'rxjs';
import { MatButtonModule, MatIconButton }                                                          from '@angular/material/button';
import { MatFormFieldModule, MatLabel }                                                            from '@angular/material/form-field';
import { MatInputModule }                                                                          from '@angular/material/input';
import { CdkTextareaAutosize }                                                                     from '@angular/cdk/text-field';
import { JsonPipe, NgForOf, NgIf }                                                                 from '@angular/common';
import { MatIcon }                                                                                 from '@angular/material/icon';
import { MatProgressSpinner }                                                                      from '@angular/material/progress-spinner';
import { MatCheckbox }                                                                             from '@angular/material/checkbox';
import { MatDatepickerModule }                                                                     from '@angular/material/datepicker';
import { MatSelectModule }                                                                         from '@angular/material/select';
import { MatOptionModule }                                                                         from '@angular/material/core';
import { MatDivider }                                                                              from '@angular/material/divider';
import { MatStepperModule }                                                                        from '@angular/material/stepper';
import { trackByFn }                                                                               from '@libs/ui/utils/utils';
import { OpenStreetMapComponent }                                                                  from '../../components/open-street-map/open-street-map.component';

const EventStatusEnum = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled',
  POSTPONED: 'postponed',
  RESCHEDULED: 'rescheduled',
  ENDED: 'ended'
};

const EventTypeEnum = {
  CONFERENCE: 'conference',
  MEETUP: 'meetup',
  WORKSHOP: 'workshop',
  SEMINAR: 'seminar',
  WEBINAR: 'webinar',
  HACKATHON: 'hackathon',
  CONCERT: 'concert',
  FESTIVAL: 'festival',
  EXHIBITION: 'exhibition',
  FAIR: 'fair',
  SHOW: 'show',
  PERFORMANCE: 'performance',
  COMPETITION: 'competition',
  GAME: 'game',
  SPORTS: 'sports',
};

const EventPlatformEnum = {
  GMEET: 'gmeet',
  ZOOM: 'zoom',
  TEAMS: 'teams',
  MAPS: 'maps',
  WEBSITE: 'website',
  OTHER: 'other',
};

@Component({
  selector: "app-new",
  standalone: true,
  imports: [
    CdkTextareaAutosize,
    JsonPipe,
    MatButtonModule,
    MatCheckbox,
    MatDatepickerModule,
    MatDivider,
    MatFormFieldModule,
    MatIcon,
    MatIconButton,
    MatInputModule,
    MatLabel,
    MatOptionModule,
    MatProgressSpinner,
    MatSelectModule,
    MatStepperModule,
    NgForOf,
    NgIf,
    OpenStreetMapComponent,
    ReactiveFormsModule,
    TranslocoDirective,
  ],
  templateUrl: "./new.component.html",
})
export class NewComponent implements OnInit {
  eventForm: UntypedFormGroup;
  notyf = new Notyf();

  eventStatusOptions = Object.values(EventStatusEnum);
  eventTypeOptions = Object.values(EventTypeEnum);
  eventPlataformOptions = Object.values(EventPlatformEnum);

  protected readonly trackByFn = trackByFn;

  constructor(
    public readonly _matDialogRef: MatDialogRef<NewComponent>,
    private readonly _translocoService: TranslocoService,
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.eventForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        title: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        description: [ undefined, [ Validators.required, Validators.minLength(3) ] ],
        isAllDay: [true, [Validators.required]],
        startDate: [undefined, [Validators.required]],
        endDate: [undefined],
      }),
      step2: this._formBuilder.group({
        location: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        url: this._formBuilder.array([]),
        image: [undefined],
        capacity: [undefined],
      }),
      step3: this._formBuilder.group({
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
      }),
    });
  }

  get urlArray(): UntypedFormArray {
    return this.eventForm.get('step2.url') as UntypedFormArray;
  }

  addUrl(): void {
    const urlGroup = this._formBuilder.group({
      label: [undefined, Validators.required],
      url: [undefined, Validators.required],
      platform: [undefined, Validators.required],
      latitude: [undefined],
      longitude: [undefined],
    });
    this.urlArray.push(urlGroup);
  }

  removeUrl(index: number): void {
    this.urlArray.removeAt(index);
  }

  onLocationSelected(index: number, event: { latitude: number, longitude: number }): void {
    const urlGroup = this.urlArray.at(index) as UntypedFormGroup;
    urlGroup.patchValue({
      latitude: event.latitude,
      longitude: event.longitude
    });
    console.log('urlGroup', urlGroup.value)
  }

  discard(): void {
    this._matDialogRef.close();
  }

  save(): void {
    if (this.eventForm.valid) {
      this.eventForm.disable();

      const flattenedData = this.flattenFormData(this.eventForm.getRawValue());
      try {
        this._eventsService
          .createEvent(flattenedData)
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

  flattenFormData(formData: any): any {
    return {
      ...formData.step1,
      ...formData.step2,
      ...formData.step3
    };
  }

  remove() {
    console.log('remove')
  }
}
