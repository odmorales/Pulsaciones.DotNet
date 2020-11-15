import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HandleHttpErrorService {
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      alert(error.error);
      return of(result as T);
    };
  }
  public log(message: string) {
    console.log(message);
  }

  constructor() { }
}
