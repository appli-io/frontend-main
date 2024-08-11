import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';

import { LeafletMouseEvent, Map, map, Marker, marker, tileLayer } from 'leaflet';

@Component({
  selector   : 'app-open-street-map',
  standalone : true,
  imports    : [],
  templateUrl: './open-street-map.component.html',
  styleUrls  : [ './open-street-map.component.scss' ],
})
export class OpenStreetMapComponent implements AfterViewInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() marker: { lat: number; lng: number };
  @Output() locationSelected = new EventEmitter<{ latitude: number; longitude: number }>();
  leafletMap: Map;
  currentMarker: Marker;
  printPlugin: any;
  @ViewChild('map') private mapContainer: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.leafletMap = map(this.mapContainer.nativeElement).setView([ this.latitude, this.longitude ], 17);

    const isRetina = window.devicePixelRatio > 1;
    const baseUrl: string = 'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=3dd80fef8eff420593405a01b0bfa621';
    const retinaUrl: string = 'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=3dd80fef8eff420593405a01b0bfa621';
    const tileLayerUrl: string = isRetina ? retinaUrl : baseUrl;

    tileLayer(tileLayerUrl, {maxZoom: 20,}).addTo(this.leafletMap);
    this.leafletMap.on('click', this.onMapClick.bind(this));

    if (this.marker) {
      const {lat, lng} = this.marker;
      this.setMarker(lat, lng);
    }

    if (!this.latitude || !this.longitude) {
      this.leafletMap.locate({setView: true, maxZoom: 20, enableHighAccuracy: true});
      this.leafletMap.on('locationfound', (e) => {
        const radius = e.accuracy;
        marker(e.latlng).addTo(this.leafletMap).bindPopup('Estás a ' + radius + ' metros de este punto').openPopup();
      });
    }
  }

  onMapClick(event: LeafletMouseEvent): void {
    const latLng = event.latlng;
    console.log('Latitud: ', latLng.lat, 'Longitud: ', latLng.lng);

    if (this.currentMarker) {
      this.currentMarker.remove();
    }
    this.currentMarker = marker([ latLng.lat, latLng.lng ]).addTo(this.leafletMap);

    this.locationSelected.emit({latitude: latLng.lat, longitude: latLng.lng});
  }

  setMarker(latitude: number, longitude: number): void {
    if (this.currentMarker) {
      this.currentMarker.remove();
    }
    this.currentMarker = marker([ latitude, longitude ]).addTo(this.leafletMap);
  }
}
