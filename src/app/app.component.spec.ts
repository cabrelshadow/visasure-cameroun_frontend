import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(AppComponent);  

    app = fixture.componentInstance;
  });

  it("juste pour le test", () => {
    expect(true).toBeInstanceOf(Boolean);
    expect(true).toBe(true);
  });

  fdescribe("calc(...)", ()=> {
    it("should be multiply two number correctly", () => {
      const result = app.calc(4,2);
      expect(result).toBe(8)
    })

  })

  it("tester mon nom dans le app component", () => {
    expect(app.mon_nom).toEqual("aboubakar");
  });

  it("should be a string", () => {
    expect(app.getName()).toBeInstanceOf(String);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'visa-sure' title`, () => {
    expect(app.title).toEqual('visa-sure');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, visa-sure');
  });
});
