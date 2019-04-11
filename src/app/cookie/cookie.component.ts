import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css'],

})
export class CookieComponent implements OnInit {
  name = '';
  constructor(private cookieService: CookieService,) { }

  ngOnInit() {
  }
  
  saveCookie(name: string) {
    this.name = name;
    this.cookieService.set( 'name', this.name ); 
    //var cookieValue = this.cookieService.get('name');
  }

}
