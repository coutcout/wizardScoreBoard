import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { GameNavBarComponent } from './game-nav-bar/game-nav-bar.component';
import { GameBoardComponent } from './game-board/game-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    TitleComponent,
    GameNavBarComponent,
    GameBoardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  
}
