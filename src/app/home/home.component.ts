import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ApiServiceService } from '../api-service.service';

declare var Plotly: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiServiceService]
})
export class HomeComponent implements OnInit {

  constructor(
    private http: Http,
    private ApiServiceService: ApiServiceService
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
    return this.ApiServiceService.passDiffEq(this.apiUrl, this.model).subscribe(
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
    var series = JSON.parse(this.resultsObj.series)
    var layout = JSON.parse(this.resultsObj.layout)
    Plotly.newPlot('results-plot',series,layout);
  }

}
