import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaPriseComponent } from './visa-prise.component';

describe('VisaPriseComponent', () => {
  let component: VisaPriseComponent;
  let fixture: ComponentFixture<VisaPriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisaPriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaPriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
