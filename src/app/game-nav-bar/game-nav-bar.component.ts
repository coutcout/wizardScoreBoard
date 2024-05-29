import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { GameManagerService } from '../game-manager.service';
import { Game } from '../game';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';

@Component({
  selector: 'app-game-nav-bar',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './game-nav-bar.component.html',
  styleUrl: './game-nav-bar.component.scss'
})
export class GameNavBarComponent {

  game: Game | null = null;
  gameSubscription: Subscription | null = null;

  constructor(
    private gameManagerService: GameManagerService,
    public newGameDialog: MatDialog
  ){}

  public startNewGame(){
    if(this.game === null){
      this.gameManagerService.startNewGame();
    } else {
      this.openNewGameDialog();
    }
  }

  private openNewGameDialog(): boolean {
    this.newGameDialog.open(NewGameDialogComponent)
      .afterClosed()
      .subscribe(confirmed => {
        console.log("Res dialog: "+ confirmed);
        if(confirmed){
          this.gameManagerService.startNewGame();
        }
      });
    return false;
  }

  ngOnInit(): void {
    this.gameSubscription = this.gameManagerService.getCurrentGame().subscribe(g => this.game = g);
  }
  
  ngOnDestroy(): void {
    if(this.gameSubscription){
      this.gameSubscription.unsubscribe();
    }
  }
}
