import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment';

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

  private apiUrl = environment.apiBaseURL;
  private showAPIField = !environment.production;
  private serverAwake = false;
  private waitingOnServer = false;
  private serverError = '';

  // Initial values
  private diffEqText = 'dx = a*x - b*x*y\ndy = -c*y + d*x*y';
  private parametersText = "a=>1.5, b=>1, c=3, d=1";
  private tsStart = 0.0;
  private tsEnd = 10.0;
  private u0Text = "1.0, 1.0";
  private solver = "Tsit5";

  private ODEsolvers = [
    // {name: 'Euler', desc:  'The canonical forward Euler method'},
    // {name: 'Midpoint' , desc:  'The second order midpoint method'},
    // {name: 'RK4' , desc:  'The canonical Runge-Kutta Order 4 method'},
    {name: 'BS3' , desc:  'Bogacki-Shampine 3/2 method'},
    // {name: 'DP5' , desc:  "Dormand-Prince's 5/4 Runge-Kutta method"},
    {name: 'Tsit5 ', desc:  'Tsitouras 5/4 Runge-Kutta method'},
    // {name: 'BS5' , desc:  'Bogacki-Shampine 5/4 Runge-Kutta method'},
    {name: 'Vern6' , desc:  "Verner's \"Most Efficient\" 6/5 Runge-Kutta method"},
    {name: 'Vern7' , desc:  "Verner's \"Most Efficient\" 7/6 Runge-Kutta method"},
    // {name: 'TanYam7' , desc:  'Tanaka-Yamashita 7 Runge-Kutta method'},
    // {name: 'DP8' , desc:  "Hairer's 8/5/3 adaption of the Dormand-Prince 8 method Runge-Kutta method"},
    // {name: 'TsitPap8' , desc:  'Tsitouras-Papakostas 8/7 Runge-Kutta method'},
    // {name: 'Vern8' , desc:  "Verner's \"Most Efficient\" 8/7 Runge-Kutta method"},
    // {name: 'Vern9' , desc:  "Verner's \"Most Efficient\" 9/8 Runge-Kutta method"},
    // {name: 'Feagin10' , desc:  "Feagin's 10th-order Runge-Kutta method"},
    // {name: 'Feagin12' , desc:  "Feagin's 12th-order Runge-Kutta method"},
    {name: 'Feagin14' , desc:  "Feagin's 14th-order Runge-Kutta method"},
    {name: 'Rosenbrock23' , desc:  "Rosenbrock's method"}
  ];

  private resultsObj: any;
  private model: any;

  ngOnInit() {
    this.wakeUp();
  }

  solve() {
    // Step 1: construct an object that contains everything we need to pass to the back-end.  We don't bind the front-end directly to this model so we can do some moderately-complex validation.
    this.model = Object.assign({}, {
      diffEqText: this.diffEqText,
      timeSpan: [this.tsStart, this.tsEnd],
      parameters: this.parametersText.replace(/\s/g, '').split(','),
      initialConditions: this.u0Text.replace(/\s/g, '').split(','),
      solver: this.solver
    });
    console.log(this.model);
    this.waitingOnServer = true;
    this.sendDiffEq();
  }

  sendDiffEq() {
    return this.ApiService.passDiffEq(this.apiUrl, this.model).subscribe(
      data => this.resultsObj = data,
      error => this.handleServerError(error),
      () => this.plot()
    );
  }

  wakeUp() {
    return this.ApiService.wakeUp(this.apiUrl).subscribe(
      data => this.serverAwake = data.awake,
      error => this.serverError = error
    );
  }


  plot() {
    var self = this;
    self.waitingOnServer = false;
    console.log(self.resultsObj);
    var series = JSON.parse(this.resultsObj.series);
    var layout = JSON.parse(this.resultsObj.layout);
    layout.margin.b = 20;
    layout.margin.l = 20;
    console.log(layout);
    Plotly.newPlot('results-plot',series,layout);
  }

  serverErrorClose() {
    this.serverError='';
  }

  handleServerError(error) {
    this.waitingOnServer = false;
    this.serverError = error;
  }

}
