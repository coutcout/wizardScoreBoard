import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  currGame: Game | null = null;
  
  constructor() { }

  startNewGame() {
    this.currGame = new Game();
  }
}
