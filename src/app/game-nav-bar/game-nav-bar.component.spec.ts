import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { GameNavBarComponent } from './game-nav-bar.component';
import { By } from '@angular/platform-browser';
import { GameManagerService } from '../game-manager.service';
import { DebugElement } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Game } from '../game';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

describe('GameNavBarComponent', () => {
  let component: GameNavBarComponent;
  let fixture: ComponentFixture<GameNavBarComponent>;
  let gameManagerService: GameManagerService;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<NewGameDialogComponent, Boolean>>;

  beforeEach(async () => {

    mockMatDialogRef = jasmine.createSpyObj(MatDialogRef, ['afterClosed']);
    mockDialog = jasmine.createSpyObj(MatDialog, {
      'open': mockMatDialogRef
    });
    await TestBed.configureTestingModule({
      imports: [GameNavBarComponent],
      providers: [
        GameManagerService,
        {
          provide: MatDialog, useValue: mockDialog
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameNavBarComponent);
    gameManagerService = TestBed.inject(GameManagerService);
    component = fixture.componentInstance;
       
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Current Game Subscription', () => {
    let gameSubscription: Subscription;
    let gameObservable: Observable<Game>;

    beforeEach(async() => {
      gameSubscription = new Subscription();
      spyOn(gameSubscription, "unsubscribe").and.callThrough();
      
      gameObservable = new Observable<Game>();
      spyOn(gameObservable, "subscribe").and.returnValue(gameSubscription);
      
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

  describe('New Game Button', () => {
    let debugElement: DebugElement;
    let newGameButton: DebugElement;
    let newGameSpy: jasmine.Spy;

    beforeEach(async () => {
      debugElement = fixture.debugElement;
      newGameButton = debugElement.query(By.css("#gameNavBar button:nth-child(1)"));
      newGameSpy = spyOn(gameManagerService, "startNewGame").and.callThrough();
    });

    it('should have a New Game button at the first position in the NavBar', () => {
      expect(newGameButton).not.toBeNull();
      expect(newGameButton.nativeElement.textContent).toEqual("New Game");
    })
  
    it('should start a new game when New Game button is clicked', () => {      
      // Act
      newGameButton.nativeElement.click();
  
      // Assert
      expect(gameManagerService.startNewGame).toHaveBeenCalledTimes(1);
    });
    
    it('should display a confirmation dialog if game is not null', fakeAsync(() => {
      // Arrange

      gameManagerService.startNewGame()
      fixture.detectChanges();
      tick();

      // Act
      newGameButton.nativeElement.click();

      // Arrange
      flush();
      fixture.detectChanges();
      expect(mockDialog.open).toHaveBeenCalledTimes(1);
    }));

    it('should not start a new game if dialog return false', fakeAsync(() => {
      // Arrange
      mockMatDialogRef.afterClosed.and.returnValue(of(false));
      gameManagerService.startNewGame();
      fixture.detectChanges();
      tick();
      newGameSpy.calls.reset();

      // Act
      newGameButton.nativeElement.click();

      // Arrange
      tick();
      fixture.detectChanges();
      expect(newGameSpy).toHaveBeenCalledTimes(0);
    }));

    it('should start a new game if dialog return true', fakeAsync(() => {
      // Arrange
      mockMatDialogRef.afterClosed.and.returnValue(of(true));
      gameManagerService.startNewGame();
      fixture.detectChanges();
      tick();
      newGameSpy.calls.reset();

      // Act
      newGameButton.nativeElement.click();

      // Arrange
      tick();
      fixture.detectChanges();
      expect(newGameSpy).toHaveBeenCalledTimes(1);
    }));
  });

});
