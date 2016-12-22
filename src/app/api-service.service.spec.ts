/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiServiceService } from './api-service.service';

describe('Service: ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiServiceService]
    });
  });

  it('should ...', inject([ApiServiceService], (service: ApiServiceService) => {
    expect(service).toBeTruthy();
  }));
});
