import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ScoreBoardComponent } from './score-board.component';
import { Game } from '../game';
import { By } from '@angular/platform-browser';
import { Player } from '../player';
import { DebugElement } from '@angular/core';
import { Round, RoundStatus } from '../round';

describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Round row', () => {
    it('should have a row for each round', () => {
      // Arrange
      let game = new Game();
      game.nbCards = 60;
      game.players = [
        {
          id:'1',
          nickname:'a'
        },
        {
          id:'2',
          nickname:'b'
        }
      ];
      component.game = game;
      
      // Act
      game.start();
      fixture.detectChanges();
      
      // Assert
      let {debugElement} = fixture;
      let rows = debugElement.queryAll(By.css('tbody tr'));
      expect(rows).toHaveSize(30);
    });

    it('should have the round number at first column', () => {
      // Arrange
      let game = new Game();
      game.nbCards = 60;
      game.players = [
        {
          id:'1',
          nickname:'a'
        },
        {
          id:'2',
          nickname:'b'
        }
      ];
      component.game = game;
  
      // Act
      game.start();
      fixture.detectChanges();
  
      // Assert
      let {debugElement} = fixture;
      let firstCols = debugElement.queryAll(By.css('tbody tr td:first-child .round'));
      firstCols.forEach((col, idx) => {
        const nativeElement: HTMLElement = col.nativeElement;
        expect(nativeElement.textContent).toEqual((idx + 1).toString());
      });
    });
  
    [
      [
        {id:"1",nickname:"a"},
        {id:"2",nickname:"b"}
      ]
    ].forEach(playerList => {
      it(`should have a column for each player. Case: ${playerList.map(p => Player.parsePlayer(p))}`, () => {
        // Arrange
        let game = new Game();
        game.nbCards = 60;
        game.players = playerList;
        component.game = game;
  
        // Act
        game.start();
        fixture.detectChanges();
  
        // Assert
        let {debugElement} = fixture;
        let playerHeaders = debugElement.queryAll(By.css('thead tr:first-child th')).slice(1);
        let playerHeadersNickname = playerHeaders
          .map(
            pHeader => {
              const nativeElement: HTMLElement = pHeader.nativeElement;
              return nativeElement.textContent;
            }
          )
          .filter(pHeader => !!pHeader)
          .sort((a, b) => (a ?? "").localeCompare(b ?? ""));
        
        let playerNicknames = game.players
          .map(p => p.nickname)
          .filter(pHeader => pHeader)
          .sort((a, b) => a.localeCompare(b));;
        expect(playerHeadersNickname).toEqual(playerNicknames);
      });
    });
  
    it('Should have an announcement button on current round', () => {
      // Arrange
      let game = new Game();
      game.nbCards = 60;
      game.players = [
        {
          id:'1',
          nickname:'a'
        },
        {
          id:'2',
          nickname:'b'
        }
      ];
      
      component.game = game;
      
      // Act
      game.start();
      game.currentRound = 0;
      fixture.detectChanges();
  
      // Arrange
      let {debugElement} = fixture;
      let currentRound = debugElement.query(By.css('tbody tr.current-round'));
      expect(currentRound).toBeTruthy();
      let currentRoundText = currentRound.query(By.css('td:first-child .round'))?.nativeElement.textContent ?? 'Not Found';
      expect(currentRoundText).toEqual('1');
  
      let announcementButton = currentRound.query(By.css('td:first-child button.announcement'));
      expect(announcementButton).toBeTruthy();
    });
  
    it('Should not have an announcement button on other rounds', () => {
      // Arrange
      let game = new Game();
      game.nbCards = 60;
      game.players = [
        {
          id:'1',
          nickname:'a'
        },
        {
          id:'2',
          nickname:'b'
        }
      ];
      
      component.game = game;
      
      // Act
      game.start();
      game.currentRound = 0;
      fixture.detectChanges();
  
      // Arrange
      let {debugElement} = fixture;
      let otherRounds = debugElement.queryAll(By.css('tbody tr:not(.current-round)'));
      expect(otherRounds).not.toHaveSize(0);
  
      otherRounds.forEach(round => {
        let announcementButton = round.query(By.css('td:first-child button.announcement'));
        expect(announcementButton).toBeFalsy();
      });
  
    });
  
    it('Should have input announcement field for each player and each round', () => {
      // Arrange
      let game = new Game();
      game.nbCards = 60;
      game.players = [
        {
          id:'1',
          nickname:'a'
        },
        {
          id:'2',
          nickname:'b'
        }
      ];
      game.currentRound = 0;
  
      component.game = game;
  
      // Act
      game.start();
      fixture.detectChanges();
  
      // Assert
      let {debugElement} = fixture;
      let rounds = debugElement.queryAll(By.css('tbody tr'));
  
      rounds.forEach(round => {
        let inputAnnouncements = round.queryAll(By.css('input.announcement'));
        expect(inputAnnouncements).toHaveSize(game.players.length);
      })
    });

    it('Should be in error when total of announcements is equal to number of cards', fakeAsync(() => {
      // Arrange
      let game = new Game();
      game.nbCards = 60;
      game.players = [
        {
          id:'1',
          nickname:'a'
        },
        {
          id:'2',
          nickname:'b'
        }
      ];
      game.start();
      fixture.detectChanges();
      game.currentRound = 3;
      let currentRound = game.rounds[game.currentRound];
      console.log(game);
      currentRound.roundScores.get('1')!.announcement = 1;
      currentRound.roundScores.get('2')!.announcement = 3;
      component.game = game;
      fixture.detectChanges();
      
      // Assert
      let {debugElement} = fixture;
      fixture.whenStable().then(() => {
        let totalOfAnnouncements = Array.from(currentRound.roundScores.values())
        .map(roundScore => roundScore.announcement)
        .filter(announcement => !!announcement)
        .reduce((sum, current) => sum! + current!, 0);
        
        expect(totalOfAnnouncements).toEqual(currentRound.nbCards);
        let round: DebugElement = debugElement.query(By.css('tbody tr.current-round'));
        expect(round.nativeElement.getAttribute('class').split(' ').indexOf("invalidAnnouncement")).not.toEqual(-1);
      });
    }));

    it('Should not be in error when total of announcements is not equal to number of cards', fakeAsync(() => {
      // Arrange
      let game = new Game();
      game.nbCards = 60;
      game.players = [
        {
          id:'1',
          nickname:'a'
        },
        {
          id:'2',
          nickname:'b'
        }
      ];
      game.start();
      fixture.detectChanges();
      game.currentRound = 2;
      let currentRound = game.rounds[game.currentRound];
      console.log(game);
      currentRound.roundScores.get('1')!.announcement = 1;
      currentRound.roundScores.get('2')!.announcement = 3;
      component.game = game;
      fixture.detectChanges();
      
      // Assert
      let {debugElement} = fixture;
      fixture.whenStable().then(() => {
        let totalOfAnnouncements = Array.from(currentRound.roundScores.values())
        .map(roundScore => roundScore.announcement)
        .filter(announcement => !!announcement)
        .reduce((sum, current) => sum! + current!, 0);
        
        expect(totalOfAnnouncements).not.toEqual(currentRound.nbCards);
        let round: DebugElement = debugElement.query(By.css('tbody tr.current-round'));
        expect(round.nativeElement.getAttribute('class').split(' ').indexOf("invalidAnnouncement")).toEqual(-1);
      });
    }));

    describe('Input announcement field', () => {
      let game: Game;
      let currentRound: Round;
      let inputAnnouncements: DebugElement[] | { nativeElement: { value: any; }; }[];
  
      beforeEach(async() => {
        // Arrange
        game = new Game();
        game.nbCards = 60;
        game.players = [
          {
            id:'1',
            nickname:'a'
          },
          {
            id:'2',
            nickname:'b'
          }
        ];
        
        game.start();
        game.currentRound = 3;
        currentRound = game.rounds[game.currentRound];
        component.game = game;
        fixture.detectChanges();
        
        let {debugElement} = fixture;
        let rounds = debugElement.queryAll(By.css('tbody tr'));
        
        inputAnnouncements = rounds[game.currentRound].queryAll(By.css('input.announcement'));
      });
  
      it('Should have announcement value for each player', fakeAsync(() => {
        // Arrange
        currentRound.roundScores.get('1')!.announcement = 1;
        currentRound.roundScores.get('2')!.announcement = 3;
  
        // Act
        fixture.detectChanges();
  
        // Assert
        fixture.whenStable().then(() => {
          expect(inputAnnouncements).toHaveSize(2);
          expect(inputAnnouncements[0].nativeElement.valueAsNumber).toEqual(1);
          expect(inputAnnouncements[1].nativeElement.valueAsNumber).toEqual(3);
        });
      }));
      
      it('Should be enabled when round status is announcement', fakeAsync(() => {
        // Arrange
        currentRound.status = RoundStatus.announcement;
  
        // Act
        fixture.detectChanges();
  
        // Assert
        fixture.whenStable().then(() => {
          let everyInputsEnabled : boolean = inputAnnouncements
            .map(input => input.nativeElement.disabled)
            .every(disabled => disabled === false);
  
          expect(everyInputsEnabled).toBeTrue();
        });
      }));
  
      it('Should be disabled when round status is results', fakeAsync(() => {
        // Arrange
        currentRound.status = RoundStatus.results;
  
        // Act
        fixture.detectChanges();
  
        // Assert
        fixture.whenStable().then(() => {
          let everyInputsEnabled : boolean = inputAnnouncements
            .map(input => input.nativeElement.disabled)
            .every(disabled => disabled === true);
  
          expect(everyInputsEnabled).toBeTrue();
        });
      }));
    });
  
    describe('Announcement Button', () => {
      let announcementButtonDebugElement: DebugElement;
  
      beforeEach(async () => {
        let game = new Game();
        game.nbCards = 60;
        game.players = [
          {
            id:'1',
            nickname:'a'
          },
          {
            id:'2',
            nickname:'b'
          }
        ];
        component.game = game;
        
        game.start();
        game.currentRound = 0;
        fixture.detectChanges();
        
        let {debugElement} = fixture;
        announcementButtonDebugElement = debugElement.query(By.css('button.announcement'));
        expect(announcementButtonDebugElement).toBeTruthy();
      });
  
      it('Should be disabled if round status is announcement', () => {
        expect(announcementButtonDebugElement.nativeElement.disabled).toBeTrue();
      });
  
      it('Should be enabled if round status is results', () => {
        // Arrange
        component.game!.rounds[component.game!.currentRound].status = RoundStatus.results;
  
        // Act
        fixture.detectChanges();
  
        // Assert
        expect(announcementButtonDebugElement.nativeElement.disabled).toBeFalse();
      });
  
      it('Should set round status to announcement on click', () => {
        // Arrange
        component.game!.rounds[component.game!.currentRound].status = RoundStatus.results;
        fixture.detectChanges();
  
        // Act
        announcementButtonDebugElement.nativeElement.click();
        fixture.detectChanges();
  
        // Assert
        expect(component.game!.rounds[component.game!.currentRound].status).toEqual(RoundStatus.announcement);
      });
    });
  });
});
