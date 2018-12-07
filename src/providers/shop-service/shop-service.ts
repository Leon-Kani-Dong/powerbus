import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, } from 'rxjs';
/*
  Generated class for the ShopServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopServiceProvider {
  url="https://pwrbus.com/shops"
  constructor(public http: HttpClient) {
    console.log('Hello ShopServiceProvider Provider');
  }
  getShops() {
    return new Promise(resolve => {
      this.http.get(this.url).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
