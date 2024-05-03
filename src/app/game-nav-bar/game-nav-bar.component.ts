import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { GameManagerService } from '../game-manager.service';

@Component({
  selector: 'app-game-nav-bar',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './game-nav-bar.component.html',
  styleUrl: './game-nav-bar.component.scss'
})
export class GameNavBarComponent {

  constructor(private gameManagerService: GameManagerService){}

  public startNewGame(){
    this.gameManagerService.startNewGame();
  }
}
