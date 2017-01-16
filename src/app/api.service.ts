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
    // Normally errors come in as response objects
    const body = error.json() || '';
    err = body.message || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''}: ${err}`;
    console.error(errMsg);
    // Check for timeout errors.  The 0 status is what appears since the Access-Control-Allow-Origin headers are not set by Heroku when it times out.  
    if ((error.status==503)||(error.status==0)) {
      err = 'The server timed out trying to calculate your response.  Try reloading, and if that doesn\'t work try DifferentialEquations.jl!';
    }
    return Observable.throw(err);
  } else {
    // A generic error fallback
    errMsg = error.message ? error.message : error.toString();
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}


}
