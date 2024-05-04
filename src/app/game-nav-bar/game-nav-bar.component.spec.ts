import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNavBarComponent } from './game-nav-bar.component';
import { By } from '@angular/platform-browser';
import { GameManagerService } from '../game-manager.service';

describe('GameNavBarComponent', () => {
  let component: GameNavBarComponent;
  let fixture: ComponentFixture<GameNavBarComponent>;
  let mockGameManagerService: GameManagerService;

  beforeEach(async () => {

    mockGameManagerService = jasmine.createSpyObj('GameManagerService', ['startNewGame']);

    await TestBed.configureTestingModule({
      imports: [GameNavBarComponent],
      providers: [
        {provide: GameManagerService, useValue: mockGameManagerService}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a New Game button at the first position in the NavBar', () => {
    const { debugElement } = fixture;
    const button = debugElement.query(By.css("#gameNavBar button:nth-child(1)"));
    expect(button).not.toBeNull();
    expect(button.nativeElement.textContent === "New Game")
  })

  it('should start a new game when New Game button is clicked', () => {
    // Arrange
    const { debugElement } = fixture;
    const button = debugElement.query(By.css("#gameNavBar button:nth-child(1)"));
    
    // Act
    button.nativeElement.click();

    // Assert
    expect(mockGameManagerService.startNewGame).toHaveBeenCalledTimes(1);
  })
});
