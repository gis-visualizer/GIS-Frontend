import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GetgeoComponent } from "./getgeo/getgeo.component";


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


  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private geo: GetgeoComponent,
    
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

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 12
    };

  }


}
