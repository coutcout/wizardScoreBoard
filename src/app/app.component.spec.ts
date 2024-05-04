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
    expect(titleComponent).not.toBeNull();
  });

  it('should have the navBar component', () => {
    const { debugElement } = fixture
    const gameNavBarComponent = debugElement.query(By.css('app-game-nav-bar'));
    expect(gameNavBarComponent).not.toBeNull();
  });

  it('should have the gameBoard component', () => {
    const { debugElement } = fixture
    const gameBoardComponent = debugElement.query(By.css('app-game-board'));
    expect(gameBoardComponent).not.toBeNull();
  });

});
