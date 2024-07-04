import { Component, Inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Notyf } from "notyf";
import { EventsService } from "../../events.service";
import { TranslocoDirective, TranslocoService } from "@ngneat/transloco";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { JsonPipe, NgForOf, NgIf } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatDivider } from "@angular/material/divider";
import { MatStepperModule } from "@angular/material/stepper";
import { trackByFn } from "@libs/ui/utils/utils";
import { OpenStreetMapComponent } from "../../components/open-street-map/open-street-map.component";
import { IEvent } from "@modules/admin/home/interface/event.interface";

const EventStatusEnum = {
  DRAFT: "draft",
  PUBLISHED: "published",
  CANCELLED: "cancelled",
  POSTPONED: "postponed",
  RESCHEDULED: "rescheduled",
  ENDED: "ended",
};

const EventTypeEnum = {
  CONFERENCE: "conference",
  MEETUP: "meetup",
  WORKSHOP: "workshop",
  SEMINAR: "seminar",
  WEBINAR: "webinar",
  HACKATHON: "hackathon",
  CONCERT: "concert",
  FESTIVAL: "festival",
  EXHIBITION: "exhibition",
  FAIR: "fair",
  SHOW: "show",
  PERFORMANCE: "performance",
  COMPETITION: "competition",
  GAME: "game",
  SPORTS: "sports",
};

const EventPlatformEnum = {
  GMEET: "gmeet",
  ZOOM: "zoom",
  TEAMS: "teams",
  MAPS: "maps",
  WEBSITE: "website",
  OTHER: "other",
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
  templateUrl: "./new-or-edit.component.html",
})
export class NewOrEditComponent implements OnInit {
  eventForm: UntypedFormGroup;
  notyf = new Notyf();

  eventStatusOptions = Object.values(EventStatusEnum);
  eventTypeOptions = Object.values(EventTypeEnum);
  eventPlatformOptions = Object.values(EventPlatformEnum);

  protected readonly trackByFn = trackByFn;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { event: IEvent },
    public readonly _matDialogRef: MatDialogRef<NewOrEditComponent>,
    private readonly _translocoService: TranslocoService,
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _eventsService: EventsService
  ) {}

  ngOnInit(): void {
    if (this.data?.event) {
      const startDate = new Date(this.data.event.startDate);
      const endDate = new Date(this.data.event.endDate);
      this.eventForm = this._formBuilder.group({
        step1: this._formBuilder.group({
          title: [this.data.event.title, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
          description: [this.data.event.description, [Validators.required, Validators.minLength(3)]],
          isAllDay: [this.data.event.isAllDay, [Validators.required]],
          startDate: [startDate.toISOString().substring(0, 10), [Validators.required]],
          startDateTime: [startDate.toTimeString().substring(0, 5), [Validators.required]],
          endDate: [endDate.toISOString().substring(0, 10)],
          endDateTime: [endDate.toTimeString().substring(0, 5)],
        }),

        step2: this._formBuilder.group({
          location: [this.data.event.location, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
          url: this._formBuilder.array([
            ...this.data.event.url.map((url) =>
              this._formBuilder.group({
                platform: [url.platform, [Validators.required]],
                label: [url.label, [Validators.required]],
                url: [url.url],
                latitude: [url.latitude],
                longitude: [url.longitude],
              })
            ),
          ]),
          image: [this.data.event.image],
          capacity: [this.data.event.capacity],
        }),

        step3: this._formBuilder.group({
          organizer: this._formBuilder.group({
            name: [this.data.event.organizer.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            email: [this.data.event.organizer.email, [Validators.required, Validators.email]],
            phone: this._formBuilder.group({
              countryCode: [this.data.event.organizer.phone.countryCode, [Validators.required]],
              number: [this.data.event.organizer.phone.number, [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
            }),
          }),
          type: [this.data.event.type, [Validators.required]],
          status: [this.data.event.status, [Validators.required]],
        }),
      });
    } else {
      this.eventForm = this._formBuilder.group({
        step1: this._formBuilder.group({
          title: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
          description: [undefined, [Validators.required, Validators.minLength(3)]],
          isAllDay: [true, [Validators.required]],
          startDate: [undefined, [Validators.required]],
          startDateTime: [undefined, [Validators.required]],
          endDate: [undefined],
          endDateTime: [undefined],
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
      this.addUrl();
    }
  }

  get urlArray(): UntypedFormArray {
    return this.eventForm.get("step2.url") as UntypedFormArray;
  }

  addUrl(): void {
    const urlGroup = this._formBuilder.group({
      platform: [undefined, Validators.required],
      label: [undefined, Validators.required],
      url: [undefined],
      latitude: [undefined],
      longitude: [undefined],
    });
    this.urlArray.push(urlGroup);
  }

  onPlatformSelected(index: number, event: { value: string }): void {
    const urlGroup = this.urlArray.at(index) as UntypedFormGroup;
    const platformValue = event.value;

    urlGroup.controls["url"].clearValidators();
    urlGroup.controls["url"].updateValueAndValidity();
    urlGroup.controls["latitude"].clearValidators();
    urlGroup.controls["latitude"].updateValueAndValidity();
    urlGroup.controls["longitude"].clearValidators();
    urlGroup.controls["longitude"].updateValueAndValidity();

    switch (platformValue) {
      case EventPlatformEnum.MAPS:
        urlGroup.controls["latitude"].setValidators([Validators.required]);
        urlGroup.controls["latitude"].updateValueAndValidity();
        urlGroup.controls["longitude"].setValidators([Validators.required]);
        urlGroup.controls["longitude"].updateValueAndValidity();
        break;
      default:
        urlGroup.controls["url"].setValidators([Validators.required]);
        urlGroup.controls["url"].updateValueAndValidity();
        break;
    }
    urlGroup.patchValue({
      platform: event.value,
    });
  }

  removeUrl(index: number): void {
    this.urlArray.removeAt(index);
  }

  onLocationSelected(index: number, event: { latitude: number; longitude: number }): void {
    const urlGroup = this.urlArray.at(index) as UntypedFormGroup;
    urlGroup.patchValue({
      latitude: event.latitude,
      longitude: event.longitude,
    });
    console.log("urlGroup", urlGroup.value);
  }

  discard(): void {
    this._matDialogRef.close();
  }

  save(): void {
    if (this.eventForm.valid) {
      this.eventForm.disable();

      const flattenedData = this.flattenFormData(this.eventForm.getRawValue());
      const eventId       = this.data.event.id
      if (this.data?.event) {
        try {
          this._eventsService
            .updateEvent(eventId, flattenedData)
            .pipe(takeUntil(this._matDialogRef.afterClosed()))
            .subscribe({
              next: (result) => {
                this._matDialogRef.close();
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
      } else {
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
  }

  flattenFormData(formData: any): any {
    const { startDate, startDateTime, endDate, endDateTime } = formData.step1;

    const startDateTimeCombined = new Date(startDate);
    if (startDateTime) {
      const [startHours, startMinutes] = startDateTime.split(":");
      startDateTimeCombined.setHours(startHours, startMinutes);
    }

    const endDateTimeCombined = endDate ? new Date(endDate) : undefined;
    if (endDateTimeCombined && endDateTime) {
      const [endHours, endMinutes] = endDateTime.split(":");
      endDateTimeCombined.setHours(endHours, endMinutes);
    }

    const flattenedData = {
      ...formData.step1,
      ...formData.step2,
      ...formData.step3,
      startDate: startDateTimeCombined,
      endDate: endDateTimeCombined,
    };

    return flattenedData;
  }

  remove() {
    console.log("remove");
  }
}
