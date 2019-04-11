import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GetgeoComponent } from "./getgeo/getgeo.component";
import { CookieService } from 'ngx-cookie-service';

declare let L;
// import { ApiService } from './api.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetgeoComponent],

})

export class AppComponent implements AfterViewInit {
  title = 'GIS visualizer';
  dtOptions: DataTables.Settings = {};
  api = 'https://localhost:5001/api/GIS?name=' + this.cookieService.get('name');
  markers = [];
  pointList = [];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private geo: GetgeoComponent,
    private cookieService: CookieService,

  ) {
    this.geo.getgeo()
    
    this.matIconRegistry.addSvgIcon(
      `map`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/map.svg')
    );
  }

  ngAfterViewInit() {
    const map = L.map('map').setView([this.geo.currentLat, this.geo.currentLong], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    fetch(this.api)
      .then((resp) => resp.json())
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          this.pointList.push([data[i].latitude, data[i].longitude])
          var marker = L.marker([data[i].latitude, data[i].longitude])
            .bindPopup("<b>Longitude: " + data[i].longitude + "<br>Latitude: " + data[i].latitude)
            .addTo(map)
            .openPopup();

          this.markers.push(marker);

        }
        console.log(this.pointList)
    var polyline = L.polyline(this.pointList, {
      color: 'red',
      weight: 3,
      
    });
    polyline.addTo(map);
    map.fitBounds(polyline.getBounds());

      })
     
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 12
    };

  }


}
