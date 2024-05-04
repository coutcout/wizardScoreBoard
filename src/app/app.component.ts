import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { GameNavBarComponent } from './game-nav-bar/game-nav-bar.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameManagerService } from './game-manager.service';
import { Game } from './game';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    TitleComponent,
    GameNavBarComponent,
    GameBoardComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  currGameObservable!: Observable<Game>;

  constructor(private gameManagerService: GameManagerService){}

  ngOnInit(): void {
    this.currGameObservable = this.gameManagerService.getCurrentGame();
  }
  
}
