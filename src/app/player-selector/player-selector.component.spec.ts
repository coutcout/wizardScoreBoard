import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectorComponent } from './player-selector.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('PlayerSelectorComponent', () => {
  const fakeSvg = `<svg><path id="someId" name="someSvg"></path></svg>`;
  let component: PlayerSelectorComponent;
  let fixture: ComponentFixture<PlayerSelectorComponent>;
  let httpTestingController: HttpTestingController;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSelectorComponent, MatIconModule, MatButtonModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();
    
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PlayerSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have only one empty player row if there is no player', () => {
    // Arrange
    fixture.detectChanges()
    let {debugElement} = fixture;

    // Act
    let playerRows = debugElement.queryAll(By.css(".player-row"));
  
    // Assert
    expect(playerRows).not.toBeNull();
    expect(playerRows).toHaveSize(1);
  });

  describe('Player row', () => {
    let playerRow!: DebugElement;

    beforeEach(async() => {
      fixture.detectChanges()
      let {debugElement} = fixture;
      playerRow = debugElement.query(By.css(".player-row"));
      expect(playerRow).not.toBeNull();
    });

    it('should have an input text describing the player nickname', () => {
      let nicknameInputDebugElement = playerRow.query(By.css("input"));
      let nicknameInput = nicknameInputDebugElement.nativeElement;

      expect(nicknameInputDebugElement).not.toBeNull();
      expect(nicknameInput.getAttribute("type")).toBe("text");
      expect(nicknameInput.getAttribute("placeholder")).toBe("Nickname");
    });

    it('should have a button to add a new player', () => {
      let addPlayerButtonDebugElement = playerRow.query(By.css("button.add"));

      expect(addPlayerButtonDebugElement).toBeTruthy();
    });

    describe("Add button", () => {
      it("should have plus icon", () => {
        let addPlayerButtonDebugElement: DebugElement = playerRow.query(By.css("button.add"));
        let addPlayerButton : HTMLElement = addPlayerButtonDebugElement.nativeElement;

        expect(addPlayerButton)
        httpTestingController.expectOne("/assets/svg/icons/plus.svg");
      });
    });
  });
});
