import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
declare var require: any;
//import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {



  private map;
  private L;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.L = require('leaflet')
      this.initMap();
    }
   }


  private initMap(): void {
    this.map = this.L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
}
