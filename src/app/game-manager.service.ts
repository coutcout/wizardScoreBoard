import { Injectable } from '@angular/core';
import { Game } from './game';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  private currGame$: Subject<Game> = new ReplaySubject(1);
  
  constructor() {}
  
  startNewGame() {
    this.currGame$.next(new Game());
  }
  
  getCurrentGame(): Observable<Game> { return this.currGame$.asObservable() };
}
