import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '../geolocation.model';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { GetgeoComponent } from '../getgeo/getgeo.component';

@Component({
  selector: 'app-geolocation-form',
  templateUrl: './geolocationForm.component.html',
  styleUrls: ['./geolocationForm.component.css']
})
export class GeolocationFormComponent implements OnInit {
  title = 'Geolocation Form';
  myForm: FormGroup;
  currentTime: number = Date.now();
  apiUrl = 'https://Localhost:5001/api/GIS';

  currentLat: any;
  currentLong: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService
    ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      longitude: '',
      latitude: '',
      // timestamp: Date.now()
    });

    this.getgeo()
  }

  getgeo() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  async onCreatePost() {
    this.myForm.value.longitude = this.currentLong
    this.myForm.value.latitude = this.currentLat
    console.log(this.myForm.value);
    this.http.post(this.apiUrl, this.myForm.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(res => console.log(res));
    // this.apiService.getUsers()
  }

}
