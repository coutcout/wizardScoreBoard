import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-new-game-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    A11yModule,
    CommonModule
  ],
  templateUrl: './new-game-dialog.component.html',
  styleUrl: './new-game-dialog.component.scss'
})
export class NewGameDialogComponent {
  title: string = 'Start new game';
  warningText: string = 'Starting a new game will delete the current game. Are you sure ?';

  constructor(public dialogRef: MatDialogRef<NewGameDialogComponent, Boolean>){};

  noButtonClick(){
    this.dialogRef.close(false);
  }

  yesButtonClick(){
    this.dialogRef.close(true);
  }
}
