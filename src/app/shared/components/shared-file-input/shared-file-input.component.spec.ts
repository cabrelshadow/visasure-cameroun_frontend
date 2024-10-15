import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFileInputComponent } from './shared-file-input.component';

describe('SharedFileInputComponent', () => {
  let component: SharedFileInputComponent;
  let fixture: ComponentFixture<SharedFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFileInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
