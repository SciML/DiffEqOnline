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
  private inputText = "[1,2,3,4,5]"
  private resultsStr = "";
  private resultsObj: any;

  ngOnInit() {
  }

  sendSquare() {
    return this.ApiServiceService.passSquare(this.apiUrl, this.inputText).subscribe(
      data => this.resultsObj = data,
      error => console.log(error),
      () => this.plot()
    );
  }

  plot() {
    // In absence of a real plot, just stringify it and show the results
    this.resultsStr = JSON.stringify(this.resultsObj);
  }

}
