import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

import { LeafletMouseEvent, Map, map, Marker, marker, tileLayer }                from 'leaflet';


@Component({
  selector   : 'app-open-street-map',
  standalone : true,
  imports    : [],
  templateUrl: './open-street-map.component.html',
  styleUrls  : [ './open-street-map.component.scss' ],
})
export class OpenStreetMapComponent implements AfterViewInit {
  @Output() locationSelected = new EventEmitter<{ latitude: number, longitude: number }>();
  neededMaps: boolean = false;
  leafletMap: Map;
  currentMarker: Marker;
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const initialState = {lng: -72.938316, lat: -36.9760017, zoom: 17};

    this.leafletMap = map(this.mapContainer.nativeElement).setView(
      [ initialState.lat, initialState.lng ],
      initialState.zoom
    );

    const isRetina = window.devicePixelRatio > 1;
    const baseUrl: string = 'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=3dd80fef8eff420593405a01b0bfa621';
    const retinaUrl: string = 'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=3dd80fef8eff420593405a01b0bfa621';
    const tileLayerUrl: string = isRetina ? retinaUrl : baseUrl;

    tileLayer(tileLayerUrl, {
      maxZoom: 20
    }).addTo(this.leafletMap);
    this.leafletMap.locate({setView: true, maxZoom: 20, enableHighAccuracy: true});
    this.leafletMap.on('click', this.onMapClick.bind(this));
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
}
