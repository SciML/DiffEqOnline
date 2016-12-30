import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from '../api.service';

declare var Plotly: any;

@Component({
  selector: 'app-ode',
  templateUrl: './ode.component.html',
  styleUrls: ['./ode.component.css'],
  providers: [ApiService]
})
export class OdeComponent implements OnInit {

  constructor(
    private http: Http,
    private ApiService: ApiService
  ) { }

  private apiUrl = "http://localhost:7777";
  private diffEqText = 'dx = a*x - b*x*y\ndy = -c*y + d*x*y';
  private parametersText = "a=>1.5, b=>1, c=3, d=1";
  private tsStart = 0.0;
  private tsEnd = 10.0;
  private u0Text = "1.0, 1.0";

  private resultsObj: any;
  private model: any;

  ngOnInit() {
  }

  solve() {
    // Step 1: construct an object that contains everything we need to pass to the back-end.  We don't bind the front-end directly to this model so we can do some moderately-complex validation.
    this.model = Object.assign({}, {
      diffEqText: this.diffEqText,
      timeSpan: [this.tsStart, this.tsEnd],
      parameters: this.parametersText.replace(/\s/g, '').split(','),
      initialConditions: this.u0Text.replace(/\s/g, '').split(',')
    });
    console.log(this.model);
    this.sendDiffEq();
  }

  sendDiffEq() {
    return this.ApiService.passDiffEq(this.apiUrl, this.model).subscribe(
      data => this.resultsObj = data,
      error => console.log(error),
      () => this.plot()
    );
  }

  // sendSquare() {
  //   return this.ApiServiceService.passSquare(this.apiUrl, this.inputText).subscribe(
  //     data => this.resultsObj = data,
  //     error => console.log(error),
  //     () => this.plot()
  //   );
  // }
  //
  plot() {
    console.log(this.resultsObj);
    var self = this;
    var series = JSON.parse(this.resultsObj.series);
    var layout = JSON.parse(this.resultsObj.layout);
    layout.margin.b = 20;
    layout.margin.l = 20;
    console.log(layout);
    Plotly.newPlot('results-plot',series,layout);
  }

}
