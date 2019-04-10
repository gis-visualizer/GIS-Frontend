import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from './geolocation.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://localhost:5001/api/GIS';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Location[]>(this.apiUrl);
  }
}
