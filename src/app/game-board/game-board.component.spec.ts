import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Game, GameStatus } from '../game';
import { GameManagerService } from '../game-manager.service';
import { GameBoardComponent } from './game-board.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardComponent, HttpClientTestingModule],
      providers: [
        GameManagerService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Current Game Subscription', () => {
    let gameManagerService: GameManagerService;
    let gameSubscription: Subscription;
    let gameObservable: Observable<Game>;

    beforeEach(async() => {
      gameSubscription = new Subscription();
      spyOn(gameSubscription, "unsubscribe").and.callThrough();
      
      gameObservable = new Observable<Game>();
      spyOn(gameObservable, "subscribe").and.returnValue(gameSubscription);
      
      gameManagerService = TestBed.inject(GameManagerService);
      spyOn(gameManagerService, "getCurrentGame").and.returnValue(gameObservable);
    });

    it('should subscribe on init', () => {
      fixture.detectChanges();
      expect(gameManagerService.getCurrentGame).toHaveBeenCalledTimes(1);
    });

    it('should unsubscribe on destroy', () => {
      fixture.detectChanges();
      component.ngOnDestroy();
      expect(gameSubscription.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('PlayerSelector', () => {
    it('should have the player selector component when game is in player status', () => {
      // Arrange
      let { debugElement } = fixture;
      component.game = new Game();
      
      // Act
      fixture.detectChanges();
      
      // Assert
      let playerSelector = debugElement.query(By.css('app-player-selector'));
      expect(playerSelector).not.toBeNull();
    });

    [
      GameStatus.Running,
      GameStatus.Ended
    ]
    .forEach(status => {
      it(`should not have the player selector component when game is ${GameStatus[status]} status`, () => {
        // Arrange
        let { debugElement } = fixture;
        component.game = new Game();
        component.game.status = status;
        
        // Act
        fixture.detectChanges();
        
        // Assert
        let playerSelector = debugElement.query(By.css('app-player-selector'));
        expect(playerSelector).toBeNull();
      });
    });
  });

  describe('ScoreBoard', () => {
    it("should be there if game is running", () => {
      // Arrange
      component.game = new Game();
      component.game.status = GameStatus.Running;

      // Act
      fixture.detectChanges();

      // Arrange
      let {debugElement} = fixture;
      let scoreBoard = debugElement.query(By.css("app-score-board"));
      expect(scoreBoard).toBeTruthy();
    });

    [
      GameStatus.Ended,
      GameStatus.PlayerSelection
    ].forEach(status => {
      it(`should not be there if game is ${GameStatus[status]} status`, () => {
        // Arrange
        component.game = new Game();
        component.game.status = status;
  
        // Act
        fixture.detectChanges();
  
        // Arrange
        let {debugElement} = fixture;
        let scoreBoard = debugElement.query(By.css("app-score-board"));
        expect(scoreBoard).toBeFalsy();
      });
    })
  });
});
