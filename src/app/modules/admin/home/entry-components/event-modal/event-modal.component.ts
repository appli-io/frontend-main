import { Component, Inject, OnInit }              from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef }          from '@angular/material/dialog';
import { IEvent }                                 from '@modules/admin/home/interface/event.interface';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { GoogleMapsModule, MapAdvancedMarker }    from '@angular/google-maps';
import { MatIcon }                                from '@angular/material/icon';

@Component({
  selector   : 'app-event-modal',
  standalone : true,
  imports    : [ MatButton, GoogleMapsModule, MapAdvancedMarker, MatIcon, MatFabButton, MatIconButton ],
  templateUrl: './event-modal.component.html',
})
export class EventModalComponent implements OnInit {
  //TODO: lat-lng change to dinamyc
  zoom = 15;
  center: google.maps.LatLngLiteral = {lat: -36.9358114, lng: -73.018882};
  options: google.maps.MapOptions = {
    mapTypeId  : 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom    : 15,
    minZoom    : 8,
  };
  markerPositions: google.maps.LatLngLiteral[] = [ {lat: -36.9358114, lng: -73.018882} ];

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: { event: IEvent },
    private _matDialogRef: MatDialogRef<EventModalComponent>
  ) {}

  ngOnInit(): void {
    console.log(this._data);
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }


  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  click(event: google.maps.MapMouseEvent) {
    console.log(event.latLng.toJSON());
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  closeDialog(): void {
    this._matDialogRef.close();
  }
}
