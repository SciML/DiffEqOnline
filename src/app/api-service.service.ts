import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ApiServiceService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  passSquare(apiUrl:string, arrStr:string) {
    // Encode the array string as a base64 string to make sure we don't have any crazy characters
    return this.http.get(apiUrl + '/squareit/' + btoa(arrStr)).map(res => res.json().data);
  }

  passDiffEq(apiUrl:string, model:any) {
    // Encode the array string as a base64 string to make sure we don't have any crazy characters
    return this.http.get(apiUrl + '/solveit/' + btoa(JSON.stringify(model))).map(res => res.json().data);
  }


}
