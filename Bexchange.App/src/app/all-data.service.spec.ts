import { TestBed } from '@angular/core/testing';

import { AllDataService } from './all-data.service';

describe('AllDataService', () => {
  let service: AllDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
