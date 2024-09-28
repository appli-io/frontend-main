import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';

import { LeafletMouseEvent, Map, map, Marker, marker, tileLayer } from 'leaflet';
import { MatFormFieldModule, MatLabel }                           from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule }                       from '@angular/forms';
import { MatInputModule }                                         from '@angular/material/input';
import { MatIcon }                                                from '@angular/material/icon';
import { MatIconButton }                                          from '@angular/material/button';
import { NgIf }                                                   from '@angular/common';
import { TranslocoPipe }                                          from '@ngneat/transloco';
import { OpenStreetMapService }                                   from '@modules/admin/admin/events/components/open-street-map/open-street-map.service';
import { Place }                                                  from '@modules/admin/admin/events/components/open-street-map/model/place';
import { Notyf }                                                  from 'notyf';

@Component({
    selector   : 'app-open-street-map',
    standalone : true,
    imports    : [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatLabel,
        MatIcon,
        MatIconButton,
        NgIf,
        TranslocoPipe,
    ],
    templateUrl: './open-street-map.component.html',
    styleUrls  : [ './open-street-map.component.scss' ],
})
export class OpenStreetMapComponent implements AfterViewInit {
    @Input() latitude: number;
    @Input() longitude: number;
    @Input() marker: { lat: number; lng: number };
    @Input() mapContainer: string = '';
    @Input() searchBar: boolean = false;
    @Output() locationSelected = new EventEmitter<{ latitude: number; longitude: number }>();
    searchControl = new FormControl('');
    leafletMap: Map;
    currentMarker: Marker;
    notyf = new Notyf();
    @ViewChild('map') private _mapContainer: ElementRef<HTMLElement>;

    constructor(private readonly _osmService: OpenStreetMapService) {}

    ngAfterViewInit(): void {
        this.leafletMap = map(this._mapContainer.nativeElement).setView([ this.latitude, this.longitude ], 17);

        const isRetina = window.devicePixelRatio > 1;
        const baseUrl: string = 'https://maps.geoapify.com/v1/tile/osm-liberty/{z}/{x}/{y}.png?apiKey=3dd80fef8eff420593405a01b0bfa621';
        const retinaUrl: string = 'https://maps.geoapify.com/v1/tile/osm-liberty/{z}/{x}/{y}@2x.png?apiKey=3dd80fef8eff420593405a01b0bfa621';
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

    findPlaces($event: KeyboardEvent | MouseEvent, value: string) {
        if (!value || value.length < 3) {
            this.searchControl.markAsTouched();
            return;
        }

        console.log('Searching for: ', value);

        this._osmService.findPlaces(value).subscribe((places: Place[]) => {
            console.log('Places: ', places);

            if (places.length === 0) {
                console.log('No places found');
                this.notyf.error('No se han encontrado resultados');
                return;
            }

            const place = places[0];

            this.leafletMap.setView([ parseFloat(place.lat), parseFloat(place.lon) ], 17);
            this.setMarker(parseFloat(place.lat), parseFloat(place.lon));
            this.locationSelected.emit({latitude: parseFloat(place.lat), longitude: parseFloat(place.lon)});
        });
    }
}
