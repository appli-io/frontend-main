import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IEvent } from "@modules/admin/home/interface/event.interface";
import { MatButton } from "@angular/material/button";
import { GoogleMapsModule } from '@angular/google-maps'
@Component({
  selector: "app-event-modal",
  standalone: true,
  imports: [MatButton, GoogleMapsModule],
  templateUrl: "./event-modal.component.html",
})
export class EventModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private _data: { event: IEvent }, private _matDialogRef: MatDialogRef<EventModalComponent>) {}

  ngOnInit(): void {
    console.log(this._data);
  }

  closeDialog(): void {
    this._matDialogRef.close();
  }
}
