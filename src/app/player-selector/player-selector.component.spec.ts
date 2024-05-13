import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PlayerSelectorComponent } from './player-selector.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Player } from '../player';
import { Game, GameStatus } from '../game';

describe('PlayerSelectorComponent', () => {
  const fakeSvg = `<svg><path id="someId" name="someSvg"></path></svg>`;
  let component: PlayerSelectorComponent;
  let fixture: ComponentFixture<PlayerSelectorComponent>;
  let httpTestingController: HttpTestingController;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSelectorComponent, MatIconModule, MatButtonModule, HttpClientTestingModule],
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

    describe("Add button", () => {
      it("should have plus icon", () => {
        let addPlayerButtonIconDebugElement: DebugElement = playerRow.query(By.css("mat-icon"));
        let addPlayerButtonIcon : HTMLElement = addPlayerButtonIconDebugElement.nativeElement;
        let iconAttribute = addPlayerButtonIcon.getAttribute('svgIcon');
        expect(iconAttribute).toBeTruthy();
        expect(iconAttribute).toEqual('plus');
        httpTestingController.expectOne("/assets/svg/icons/plus.svg");
      });

      it("should add a new player line when clicked", () => {
        let addPlayerButtonDebugElement: DebugElement = playerRow.query(By.css("button.add"));
        let addPlayerButton : HTMLElement = addPlayerButtonDebugElement.nativeElement;

        // Act
        addPlayerButton.click();
        fixture.detectChanges();

        // Assert
        let {debugElement} = fixture;
        let playerRows = debugElement.queryAll(By.css(".player-row"));
        expect(playerRows).toHaveSize(2);
      });

      
      it('should be there if last player row', () => {
        // Arrange
        component.addPlayer();
        fixture.detectChanges();

        // Assert
        let {debugElement} = fixture;
        let addPlayerButtonDebugElementList = debugElement.queryAll(By.css(".player-row"));

        expect(addPlayerButtonDebugElementList).toHaveSize(2);
        expect(addPlayerButtonDebugElementList[0].query(By.css("button.add"))).not.toBeTruthy();
        expect(addPlayerButtonDebugElementList[1].query(By.css("button.add"))).toBeTruthy();
      });
    });

    describe("Remove button", () => {
      it("should remove the player line when clicked", async(() => {
        // Arrange
        let {debugElement} = fixture;
        
        component.players = [
          {id:"1", nickname:"a"},
          {id:"2", nickname:"b"},
        ]
        fixture.detectChanges();

        let playerRows = debugElement.queryAll(By.css(".player-row"));
        expect(playerRows).toHaveSize(2);

        let removePlayerButtonDebugElement: DebugElement = playerRows[0].query(By.css("button.remove"));
        let removePlayerButton : HTMLElement = removePlayerButtonDebugElement.nativeElement;

        // Act
        removePlayerButton.click();
        fixture.detectChanges();

        // Assert
        fixture.whenStable().then(() => {
          playerRows = debugElement.queryAll(By.css(".player-row"));
          expect(playerRows).toHaveSize(1);
          let playerRowInput: HTMLInputElement = playerRows[0].query(By.css("input")).nativeElement;
          expect(playerRowInput.value).toEqual("b");
        });
      }));

      it('should be there if not the only player row', () => {
        // Arrange
        component.addPlayer();
        fixture.detectChanges();

        // Assert
        let {debugElement} = fixture;
        let addPlayerButtonDebugElementList = debugElement.queryAll(By.css(".player-row"));
        
        expect(addPlayerButtonDebugElementList).toHaveSize(2);
        addPlayerButtonDebugElementList.forEach(player => {
          expect(player.query(By.css("button.remove"))).toBeTruthy();
        });
      });

      it('should not be there if only one player row', () => {
        // Assert
        let {debugElement} = fixture;
        let addPlayerButtonDebugElementList = debugElement.queryAll(By.css(".player-row"));
        
        expect(addPlayerButtonDebugElementList).toHaveSize(1);
        expect(addPlayerButtonDebugElementList[0].query(By.css("button.remove"))).not.toBeTruthy();
      });

      it("should have remove icon", () => {
        // Arrange
        component.addPlayer();
        fixture.detectChanges();
        
        // Assert
        let {debugElement} = fixture;
        let addPlayerButtonDebugElementList = debugElement.queryAll(By.css(".player-row"));
        
        expect(addPlayerButtonDebugElementList).toHaveSize(2);

        let playerRow = addPlayerButtonDebugElementList[0];
        let addPlayerButtonIconDebugElement: DebugElement = playerRow.query(By.css("mat-icon"));
        let addPlayerButtonIcon : HTMLElement = addPlayerButtonIconDebugElement.nativeElement;
        let iconAttribute = addPlayerButtonIcon.getAttribute('svgIcon');
        expect(iconAttribute).toBeTruthy();
        expect(iconAttribute).toEqual('remove');
        httpTestingController.expectOne("/assets/svg/icons/remove.svg");
      });
    });
  });

  describe("Validate Button", () => {
    it("should have an active validate button when at least 2 player are corrects", () => {
      // Arrange
      component.players = [
        {id:"1",nickname:"a"},
        {id:"2",nickname:"b"},
      ];
      
      // Act
      fixture.detectChanges();

      // Assert
      let {debugElement} = fixture;
      let validateButton = debugElement.query(By.css("button.validate"));

      expect(validateButton).toBeTruthy();
      expect(validateButton.nativeElement.disabled).toBeFalse();
    });

    const parsePlayer = (player: any) => {
      let p : Player = new Player();
      return Object.assign(p, player);
    };

    [
      [
        {id:"1",nickname:" "},
        {id:"2",nickname:" "},
        {id:"3",nickname:" "},
      ],
      [
        {id:"1",nickname:"a"},
        {id:"2",nickname:""},
      ],
      [
        {id:"1",nickname:"a"},
      ],
      [],
    ].forEach(playerList => {
      it(`should not have a disabled validate button with ${playerList.map(p => parsePlayer(p))}`, () => {
        // Arrange
        component.players = playerList;
        
        // Act
        fixture.detectChanges();
  
        // Assert
        let {debugElement} = fixture;
        let validateButton = debugElement.query(By.css("button.validate"));
  
        expect(validateButton).toBeTruthy();
        expect(validateButton.nativeElement.disabled).toBeTrue();
      });
    });

    it('should update the game with players', () =>{
      // Arrange
      component.players = [
        {id:"1",nickname:"a"},
        {id:"2",nickname:"b"},
      ];

      component.game = new Game();

      fixture.detectChanges();

      // Act
      let {debugElement} = fixture;
      let validateButton = debugElement.query(By.css("button.validate"));
      validateButton.nativeElement.click();
      fixture.detectChanges();

      // Assert
      expect(component.game.players).toEqual(component.players);
    });

    it('should update the game status to running', () =>{
      // Arrange
      component.players = [
        {id:"1",nickname:"a"},
        {id:"2",nickname:"b"},
      ];

      component.game = new Game();

      fixture.detectChanges();

      // Act
      let {debugElement} = fixture;
      let validateButton = debugElement.query(By.css("button.validate"));
      validateButton.nativeElement.click();
      fixture.detectChanges();

      // Assert
      expect(component.game.status).toEqual(GameStatus.Running);
    });
  });
});
