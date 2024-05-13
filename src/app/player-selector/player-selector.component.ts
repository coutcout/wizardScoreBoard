import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {IconResolver, MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-player-selector',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  providers:[
    MatIconRegistry
  ],
  templateUrl: './player-selector.component.html',
  styleUrl: './player-selector.component.scss'
})
export class PlayerSelectorComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    const iconUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/svg/icons/plus.svg");
    this.matIconRegistry.addSvgIcon("plus", iconUrl);
  }
}
