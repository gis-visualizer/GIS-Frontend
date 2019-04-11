import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { HttpClient } from 'selenium-webdriver/http';
import { ApiService } from './api.service';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcelService } from './services/excel.service';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { GeolocationFormComponent } from './geolocationForm/geolocationForm.component';
import { MatIconModule } from '@angular/material/icon';
import { DataTableComponent } from './data-table/data-table.component';
import { GetgeoComponent } from './getgeo/getgeo.component';
import { CookieService } from 'ngx-cookie-service';
import { CookieComponent } from './cookie/cookie.component';


@NgModule({
  declarations: [
    AppComponent,
    GeolocationFormComponent,
    DataTableComponent,
    GetgeoComponent,
    CookieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [ApiService, ExcelService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
