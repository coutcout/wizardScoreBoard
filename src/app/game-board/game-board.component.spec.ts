import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { GameManagerService } from '../game-manager.service';
import { Observable, Subscription } from 'rxjs';
import { Game } from '../game';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardComponent],
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
});
