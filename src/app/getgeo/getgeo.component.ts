import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getgeo',
  templateUrl: './getgeo.component.html',
  styleUrls: ['./getgeo.component.css']
})
export class GetgeoComponent implements OnInit {

  currentLat: any;
  currentLong: any;

  constructor() { }

  ngOnInit() {
  }

  public getgeo() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        return [this.currentLat, this.currentLong]
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    
  }

}
