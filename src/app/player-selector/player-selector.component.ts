import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {IconResolver, MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Player } from '../player';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game, GameStatus } from '../game';
import { GameManagerService } from '../game-manager.service';

@Component({
  selector: 'app-player-selector',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  providers:[
    MatIconRegistry
  ],
  templateUrl: './player-selector.component.html',
  styleUrl: './player-selector.component.scss'
})
export class PlayerSelectorComponent {
  players: Player[];

  @Input()
  game!: Game | null;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    const iconPlusUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/svg/icons/plus.svg");
    this.matIconRegistry.addSvgIcon("plus", iconPlusUrl);

    const iconRemoveUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/svg/icons/remove.svg");
    this.matIconRegistry.addSvgIcon("remove", iconRemoveUrl);

    this.players = [
      new Player()
    ]
  }

  addPlayer(){
    this.players.push(new Player());
  }

  removePlayer(player: Player){
    this.players = this.players.filter(p => p !== player);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  isPlayerListValide(): boolean {
    return (this.players.filter(p => this.isPlayerValide(p))).length >= 2;
  }

  isPlayerValide(p: Player): boolean {
    return !!p.nickname.trim(); 
  }

  validate(){
    if(this.game !== null){
      this.game.players = this.players;
      this.game.status = GameStatus.Running;
    }
  }
}
