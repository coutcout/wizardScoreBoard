import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameManagerService } from '../game-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit, OnDestroy{
  game: Game | null = null;
  gameSubscription: Subscription | null = null;

  constructor(private gameManagerService: GameManagerService){}
  
  ngOnInit(): void {
    console.log("init");
    this.gameSubscription = this.gameManagerService.getCurrentGame().subscribe(g => this.game = g);
  }
  
  ngOnDestroy(): void {
    if(this.gameSubscription){
      this.gameSubscription.unsubscribe();
    }
  }

}
