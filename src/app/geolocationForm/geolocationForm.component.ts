import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Location } from "../geolocation.model";
import { map } from "rxjs/operators";
import { ApiService } from "../api.service";
import { GetgeoComponent } from "../getgeo/getgeo.component";

@Component({
  selector: "app-geolocation-form",
  templateUrl: "./geolocationForm.component.html",
  styleUrls: ["./geolocationForm.component.css"]
})
export class GeolocationFormComponent implements OnInit {
  title = "Geolocation Form";
  myForm: FormGroup;
  myFormCalc: FormGroup;
  currentTime: number = Date.now();
  list = [];
  apiUrl = "https://Localhost:5001/api/GIS";
  apiUrlCalc = "https://Localhost:5001/api/GIS/calculation";

  currentLat: any;
  currentLong: any;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      longitude: "",
      latitude: ""
    });
    this.myFormCalc = this.fb.group({
      clongitude: "",
      clatitude: "",
      llongitude: "",
      llatitude: "",
      distancebetween: ""
    });
    this.getgeo();
  }

  getgeo() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  toRad(x) {
    return (Math.PI / 180.0) * x;
  }

  haversine(coord1, coord2) {
    const R = 6371;
    const dLat = this.toRad(coord2[0] - coord1[0]);
    const dLon = this.toRad(coord2[1] - coord1[1]);
    const lat1 = this.toRad(coord1[0]);
    const lat2 = this.toRad(coord2[0]);
    var formula =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLon / 2), 2);
    var D = 2 * Math.asin(Math.sqrt(formula));
    return R * D
  }

  locationCoords() {
    return fetch(this.apiUrl)
    .then((resp) => resp.json())
    .then((data) => data)
}

  async onCreatePost() {
    this.myForm.value.longitude = this.currentLong
    this.myForm.value.latitude = this.currentLat
    await this.http.post(this.apiUrl, this.myForm.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(res => console.log(res));
  }
  
  async onDistancePost() {   
    this.list = []
    await this.locationCoords().then(arr => arr.forEach((arr) => this.list.push([arr.latitude,arr.longitude])))
    var lastLocation = this.list.pop()
    // for (var i = 0; i <= this.list.length; i++) {
      this.myFormCalc.value.clongitude = this.currentLong;
      this.myFormCalc.value.clatitude = this.currentLat;
      this.myFormCalc.value.llatitude = lastLocation[0];
      this.myFormCalc.value.llongitude = lastLocation[1];
      this.myFormCalc.value.distancebetween = this.haversine(
        [this.currentLat, this.currentLong],lastLocation
      );
      this.http
        .post(this.apiUrlCalc, this.myFormCalc.value, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .subscribe(res => console.log(res));
    }
  // }
}
