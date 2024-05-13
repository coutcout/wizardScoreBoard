import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game, GameStatus } from '../game';
import { GameManagerService } from '../game-manager.service';
import { Subscription } from 'rxjs';
import { PlayerSelectorComponent } from '../player-selector/player-selector.component';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    PlayerSelectorComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit, OnDestroy{
  readonly GameStatus = GameStatus;

  game: Game | null = null;
  gameSubscription: Subscription | null = null;

  constructor(private gameManagerService: GameManagerService){}
  
  ngOnInit(): void {
    this.gameSubscription = this.gameManagerService.getCurrentGame().subscribe(g => this.game = g);
  }
  
  ngOnDestroy(): void {
    if(this.gameSubscription){
      this.gameSubscription.unsubscribe();
    }
  }

}
