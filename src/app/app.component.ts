import { Component } from '@angular/core';
import { Marker } from './marker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  marker: Marker;
  markers: Marker[]

  //Eliminar
  lat = null;
  lng = null;
  googleMapKey = 'AIzaSyA5mjCwx1TRLuBAjwQw84WE6h5ErSe7Uj8';
  title = 'covid19';

  addMarker() {
    this.marker = new Marker (20.6752255, -103.3612204);
    this.markers.push(this.marker);
    console.log('info', this.marker);
  }
  
}
