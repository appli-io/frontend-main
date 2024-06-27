import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { LeafletMouseEvent, Map, map, marker, tileLayer } from "leaflet";

@Component({
  selector: "app-open-street-map",
  standalone: true,
  imports: [],
  templateUrl: "./open-street-map.component.html",
  styleUrls: ["./open-street-map.component.scss"],
})
export class OpenStreetMapComponent implements AfterViewInit {

  @ViewChild("map")
  private mapContainer: ElementRef<HTMLElement>;

  neededMaps: boolean = false;
  leafletMap : Map;

  ngAfterViewInit(): void {
 
        const initialState = { lng: -72.938316, lat: -36.9760017, zoom: 17 };

        this.leafletMap = map(this.mapContainer.nativeElement).setView(
          [initialState.lat, initialState.lng],
          initialState.zoom
        );

        const isRetina = window.devicePixelRatio > 1;
        const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=3dd80fef8eff420593405a01b0bfa621";
        const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=3dd80fef8eff420593405a01b0bfa621";
        const tileLayerUrl = isRetina ? retinaUrl : baseUrl;

        tileLayer(tileLayerUrl, {
          attribution:
            'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
          maxZoom: 20,
        }).addTo(this.leafletMap);

        // marker([url.latitude, url.longitude]).addTo(this.leafletMap);
        this.leafletMap.on('click', this.onMapClick);
  }

  onMapClick(event: LeafletMouseEvent): void {
    const lat = event.latlng;
    console.log('Latitud: ',lat);
  }

}
