import { TestBed } from '@angular/core/testing';

import { GameManagerService } from './game-manager.service';

describe('GameManagerService', () => {
  let service: GameManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not have a currGame at creation', () => {
    expect(service.currGame).toBeNull();
  });
  
  describe('startNewGame', () => {
    it('should create a new game when no game is currently played', () => {
      // Arrange
      service.currGame = null;

      // Act
      service.startNewGame();

      // Assert
      expect(service.currGame).not.toBeNull();
    })
  })
});
