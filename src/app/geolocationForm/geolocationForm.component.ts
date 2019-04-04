import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '../geolocation.model';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-geolocation-form',
  templateUrl: './geolocationForm.component.html',
  styleUrls: ['./geolocationForm.component.css']
})
export class GeolocationFormComponent implements OnInit {
  title = 'Geolocation Form';
  myForm: FormGroup;
  currentTime: number = Date.now();
  apiUrl = 'https://gis-visualizer-server.azurewebsites.net/api/GIS';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService
    ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      category: '',
      longitude: '',
      latitude: '',
      altitude: '',
      radius: '',
      // timestamp: Date.now()
    });

    this.myForm.valueChanges.subscribe(value => console.log(value));
  }

  onCreatePost() {
    console.log(this.myForm.value);
    this.http.post(this.apiUrl, this.myForm.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(res => console.log(res));
    // this.apiService.getUsers()
  }

}
