import { Component, Input } from '@angular/core';
import { Game } from '../game';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule
  ],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.scss'
})
export class ScoreBoardComponent {

  @Input()
  game!: Game | null;

  getTableData(){
    return [
      'round',
      ...this.game!.getPlayersId()
    ]
  }
}
