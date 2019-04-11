import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from '../services/excel.service';
import { Location } from '../geolocation.model';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;
  geoData: Location[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'longitude', 'latitude'];

  constructor(private apiService: ApiService, public excelService: ExcelService) {}

  ngOnInit() {
    console.log('ngOninit');
    this.apiService.getUsers().subscribe(data => {
      this.geoData = data;
      this.dataSource = new DataTableDataSource(this.paginator, this.sort, data);
    });
    console.log('where am i');
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.geoData, 'sample');
  }
}
