import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { GameNavBarComponent } from './game-nav-bar/game-nav-bar.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    TitleComponent,
    GameNavBarComponent,
    GameBoardComponent,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  readonly title: string = "Wizard Score Board";

  constructor(
    private titleService: Title,
  ){
    this.titleService.setTitle(this.title);
  }
}
