import { TestBed } from '@angular/core/testing';

import { VisaServicePlanService } from './visa-service-plan.service';

describe('VisaServicePlanService', () => {
  let service: VisaServicePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisaServicePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
