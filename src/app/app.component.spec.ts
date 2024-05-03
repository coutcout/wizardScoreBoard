import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture : ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have the title component', () => {
    const { debugElement } = fixture
    const titleComponent = debugElement.query(By.css('app-title'));
    expect(titleComponent).not.toBeUndefined();
  });

  it('should have the navBar component', () => {
    const { debugElement } = fixture
    const gameNavBarCompoement = debugElement.query(By.css('app-gameNavBar'));
    expect(gameNavBarCompoement).not.toBeUndefined();
  });
});
