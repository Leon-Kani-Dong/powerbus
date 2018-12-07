import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, } from 'rxjs';
import { CompileMetadataResolver } from '@angular/compiler';
/*
  Generated class for the CodeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let url='https://pwrbus.com/codes/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class CodeServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CodeServiceProvider Provider');
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // alert('Can not send SMS,try again.')

 
      // Let the app keep running by returning an empty result.
      return Observable.of(result as T);
    };
  }

  createCode (data): Observable<any> {
    console.log(data)
    return this.http.post(url, data, httpOptions)
      .pipe(
    
        catchError(this.handleError<any>('codeError88888'))
      );
  }
  
}
