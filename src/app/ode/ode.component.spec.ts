/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OdeComponent } from './ode.component';

describe('OdeComponent', () => {
  let component: OdeComponent;
  let fixture: ComponentFixture<OdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
