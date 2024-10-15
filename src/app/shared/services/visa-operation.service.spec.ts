import { TestBed } from '@angular/core/testing';

import { VisaOperationService } from './visa-operation.service';

describe('VisaOperationService', () => {
  let service: VisaOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisaOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
