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
  neededMaps: boolean = false;
  markers: google.maps.LatLngLiteral[] = [];
  zoom: number = 15;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId  : 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom    : 15,
    minZoom    : 8,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: { event: IEvent },
    private _matDialogRef: MatDialogRef<EventModalComponent>
  ) {}

  ngOnInit(): void {
    console.log('Evento en el modal: ',this._data);
    if(this._data.event.url?.some((url) => url.platform === 'maps')){
      this.neededMaps = true;
      this._data.event.url.forEach((url) => {
        if(url.platform === 'maps'){
          this.center = {lat: url.latitude, lng: url.longitude};
          this.markers.push({lat: url.latitude, lng: url.longitude});
        }
      });
    }
    console.log('Markers: ',this.markers);
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

  closeDialog(): void {
    this._matDialogRef.close();
  }
}
