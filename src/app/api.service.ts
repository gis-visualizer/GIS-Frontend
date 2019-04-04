import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from './geolocation.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://gis-visualizer-server.azurewebsites.net/api/GIS';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Location[]>(this.apiUrl);
  }
}
