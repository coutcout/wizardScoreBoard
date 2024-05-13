import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {IconResolver, MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Player } from '../player';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    const iconUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/svg/icons/plus.svg");
    this.matIconRegistry.addSvgIcon("plus", iconUrl);
    this.players = [
      new Player()
    ]
  }

  addPlayer(){
    this.players.push(new Player());
    console.log(this.players);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
