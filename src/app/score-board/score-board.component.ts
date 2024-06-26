import { Component, Input } from '@angular/core';
import { Game } from '../game';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Round, RoundStatus } from '../round';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.scss'
})
export class ScoreBoardComponent {
  readonly RoundStatus = RoundStatus;

  @Input()
  game!: Game | null;

  getTableData(){
    return [
      'round',
      ...this.game!.getPlayersId()
    ]
  }

  activateAnnouncementPhase(round: Round){
    round.status = RoundStatus.announcement;
  }

  activateResultsPhase(round: Round){
    round.status = RoundStatus.results;
  }

  selectRound(index: number){
    this.game!.currentRound = index;
  }

  selectRoundByKey(event:KeyboardEvent, index: number){
    if(event.key === "Enter"){
      this.selectRound(index);
    }
  }
}
