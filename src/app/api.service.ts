import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  passDiffEq(apiUrl:string, model:any) {
    // Encode the array string as a base64 string to make sure we don't have any crazy characters
    return this.http.get(apiUrl + '/solveit/' + btoa(JSON.stringify(model)))
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  wakeUp(apiUrl:string) {
    return this.http.get(apiUrl + '/wakeup')
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  var err = '';
  if (error instanceof Response) {
    const body = error.json() || '';
    err = body.message || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''}: ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(err);
}


}
