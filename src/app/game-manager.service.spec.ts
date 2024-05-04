import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GameManagerService } from './game-manager.service';
import { Game } from './game';

describe('GameManagerService', () => {
  let service: GameManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not have a currGame at creation', fakeAsync(() => {
    // Arrange
    let game : Game | null = null;
    service.getCurrentGame().subscribe(g => {
      game = g;
    });

    // Act
    tick();

    // Assert
    expect(game).toBeNull();
  }));

  it('should send currGame when subscribed and a game is already started', fakeAsync(() => {
    // Arrange
    let game : Game | null = null;
    service.startNewGame();
    tick();
    
    service.getCurrentGame().subscribe(g => {
      game = g;
    });

    // Act
    tick();


    // Assert
    expect(game).not.toBeNull();
  }));
  
  describe('startNewGame', () => {
    it('should create a new game when no game is currently played', fakeAsync(() => {
      // Arrange
      let game : Game | null = null;
      service.getCurrentGame().subscribe(g => {
        game = g;
      });
  
      // Act
      service.startNewGame();
      //tick();
  
      // Assert
      expect(game).not.toBeNull();
    }));

    it('should send a new game when a game is already started', fakeAsync(() => {
      // Arrange
      let game : Game | null = null;
      service.getCurrentGame().subscribe(g => {
        game = g;
      });
      service.startNewGame();
      tick();
      let oldGame = game;
  
      // Act
      service.startNewGame();
      tick();
  
  
      // Assert
      expect(game).not.toBeNull();
      expect(game).not.toEqual(oldGame);
    }));
  })
});
