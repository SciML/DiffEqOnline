import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { OdeComponent } from './ode/ode.component';
import { SdeComponent } from './sde/sde.component';
import { HomeComponent } from './home/home.component';

const routing = RouterModule.forRoot([
  { path: '', component: HomeComponent },
  { path: 'ode', component: OdeComponent },
  { path: 'sde', component: SdeComponent }

  // { path: 'radios', component: RadiosComponent }
]);

@NgModule({
  declarations: [
    AppComponent,
    OdeComponent,
    SdeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ClarityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
