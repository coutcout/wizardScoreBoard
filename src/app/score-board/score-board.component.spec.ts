import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ScoreBoardComponent } from './score-board.component';
import { Game } from '../game';
import { By } from '@angular/platform-browser';
import { Player } from '../player';
import { DebugElement } from '@angular/core';
import { Round, RoundStatus } from '../round';
import { setRoundScore } from '../game.spec';

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
      currentRound.roundScores.get('1')!.announcement = 1;
      currentRound.roundScores.get('2')!.announcement = 3;
      component.game = game;
      fixture.detectChanges();
      
      // Assert
      let {debugElement} = fixture;
      fixture.whenStable().then(() => {        
        expect(currentRound.getTotalOfAnnouncement()).toEqual(currentRound.nbCards);
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
      currentRound.roundScores.get('1')!.announcement = 1;
      currentRound.roundScores.get('2')!.announcement = 3;
      component.game = game;
      fixture.detectChanges();
      
      // Assert
      let {debugElement} = fixture;
      fixture.whenStable().then(() => {        
        expect(currentRound.getTotalOfAnnouncement()).not.toEqual(currentRound.nbCards);
        let round: DebugElement = debugElement.query(By.css('tbody tr.current-round'));
        expect(round.nativeElement.getAttribute('class').split(' ').indexOf("invalidAnnouncement")).toEqual(-1);
      });
    }));

    describe('Round selction', () => {
      let game: Game;
      let roundItems: DebugElement[];

      beforeEach(() => {
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
        game.currentRound = 2;
        component.game = game;

        fixture.detectChanges();
        let {debugElement} = fixture;
        roundItems = debugElement.queryAll(By.css('tbody tr'));
        expect(roundItems[game.currentRound].nativeElement.getAttribute('class').split(' ').indexOf('current-round')).not.toEqual(-1);
      });

      it('should become the current round when round column is clicked - other rounds', () => {
        // Act
        let roundColumn = roundItems[5].query(By.css('td.mat-column-round'));
        expect(roundColumn).toBeTruthy();
        roundColumn.nativeElement.click();
        fixture.detectChanges();
  
        // Arrange
        expect(game.currentRound).toEqual(5);
        expect(roundItems[5].nativeElement.getAttribute('class').split(' ').indexOf('current-round')).not.toEqual(-1);
      });
  
      [
        "Enter"
      ].forEach(key => {
        it(`should become the current round when round column is focus and '${key}' key is pressed - other rounds`, () => {
          // Arrange
          let roundColumn = roundItems[5].query(By.css('td.mat-column-round'));
          expect(roundColumn).toBeTruthy();
          
          roundColumn.nativeElement.focus();
          fixture.detectChanges();
          expect(document.activeElement).toBe(roundColumn.nativeElement);
          
          // Act
          
          const event = new KeyboardEvent("keypress",{
            "key": key // Enter
          });
          roundColumn.nativeElement.dispatchEvent(event);
          fixture.detectChanges();
    
          // Arrange
          expect(game.currentRound).toEqual(5);
          expect(roundItems[5].nativeElement.getAttribute('class').split(' ').indexOf('current-round')).not.toEqual(-1);
        });
      });
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
  
      it('Should have an announcement button on current round', () => {
        // Assert
        let {debugElement} = fixture;
        let currentRound = debugElement.query(By.css('tbody tr.current-round'));
        expect(currentRound).toBeTruthy();
        let currentRoundText = currentRound.query(By.css('td:first-child .round'))?.nativeElement.textContent ?? 'Not Found';
        expect(currentRoundText).toEqual('1');
    
        let announcementButton = currentRound.query(By.css('td:first-child button.announcement'));
        expect(announcementButton).toBeTruthy();
      });
    
      it('Should not have an announcement button on other rounds', () => {
        // Assert
        let {debugElement} = fixture;
        let otherRounds = debugElement.queryAll(By.css('tbody tr:not(.current-round)'));
        expect(otherRounds).not.toHaveSize(0);
    
        otherRounds.forEach(round => {
          let announcementButton = round.query(By.css('td:first-child button.announcement'));
          expect(announcementButton).toBeFalsy();
        });
    
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

    describe('Results Button', () => {
      let resultsButtonDebugElement: DebugElement;
  
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
        resultsButtonDebugElement = debugElement.query(By.css('button.results'));
      });

      it('Should have a results button on current round', () => {
        // Assert
        let {debugElement} = fixture;
        let currentRound = debugElement.query(By.css('tbody tr.current-round'));
        expect(currentRound).toBeTruthy();
        let currentRoundText = currentRound.query(By.css('td:first-child .round'))?.nativeElement.textContent ?? 'Not Found';
        expect(currentRoundText).toEqual('1');
    
        let resultsButton = currentRound.query(By.css('td:first-child button.results'));
        expect(resultsButton).toBeTruthy();
      });

      it('Should not have a results button on other rounds', () => {
        // Assert
        let {debugElement} = fixture;
        let otherRounds = debugElement.queryAll(By.css('tbody tr:not(.current-round)'));
        expect(otherRounds).not.toHaveSize(0);
    
        otherRounds.forEach(round => {
          let resultsButton = round.query(By.css('td:first-child button.results'));
          expect(resultsButton).toBeFalsy();
        });
      });

      it('Should be disabled if round status is results', fakeAsync(() => {
        // Arrange
        const game = component.game!;
        game.rounds[game.currentRound].status = RoundStatus.results;
        
        // Act
        fixture.detectChanges();

        // Assert
        fixture.whenStable().then(() => {
          expect(resultsButtonDebugElement.nativeElement.disabled).toBeTrue();
        });
      }));

      it('Should be disabled if round status is announcement', fakeAsync(() => {
        // Arrange
        const game = component.game!;
        game.rounds[game.currentRound].status = RoundStatus.announcement;
        
        // Act
        fixture.detectChanges();

        // Assert
        fixture.whenStable().then(() => {
          expect(resultsButtonDebugElement.nativeElement.disabled).toBeFalse();
        });
      }));

      it('Should set round status to results on click', () => {
        // Arrange
        const game = component.game!;
        game.rounds[game.currentRound].status = RoundStatus.announcement;
  
        // Act
        resultsButtonDebugElement.nativeElement.click();
        fixture.detectChanges();
  
        // Assert
        expect(component.game!.rounds[component.game!.currentRound].status).toEqual(RoundStatus.results);
      });
    });
  });

  describe('Input fields', () => {
    let game: Game;
    let currentRound: Round;
    let rounds: DebugElement[];
    
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
      rounds = debugElement.queryAll(By.css('tbody tr'));
    });
    
    [
      'announcement',
      'results'
    ].forEach(inputClass => {
      [
        RoundStatus.announcement,
        RoundStatus.results
      ].forEach(roundStatus => {
        it(`${inputClass} inputs should be disabled when round is not the current round - ${RoundStatus[roundStatus]} status`, fakeAsync(() => {
          // Arrange
          game.rounds.forEach(round => {
            round.status = roundStatus;
          });
    
          // Act
          fixture.detectChanges();
    
          // Assert
          let {debugElement} = fixture;
          let otherRounds = debugElement.queryAll(By.css('tbody tr:not(.current-round)'));
      
          fixture.whenStable().then(() => {
            otherRounds.forEach(round => {
              let inputResults = round.queryAll(By.css('input.' + inputClass));
              expect(areAllInputsDisabled(inputResults)).toBeTrue();
            });
          });
        }));
      });
    });

    describe('Input results field', () => {
      let inputResults: DebugElement[];
  
      beforeEach(() => {
        inputResults = rounds[game.currentRound].queryAll(By.css('input.results'));
      });
  
      it('Should have results value for each player', fakeAsync(() => {
        // Arrange
        currentRound.roundScores.get('1')!.result = 1;
        currentRound.roundScores.get('2')!.result = 3;
  
        // Act
        fixture.detectChanges();
  
        // Assert
        fixture.whenStable().then(() => {
          expect(inputResults).toHaveSize(2);
          expect(inputResults[0].nativeElement.valueAsNumber).toEqual(1);
          expect(inputResults[1].nativeElement.valueAsNumber).toEqual(3);
        });
      }));
      
      it('Should be enabled when round status is results', fakeAsync(() => {
        // Arrange
        currentRound.status = RoundStatus.results;
  
        // Act
        fixture.detectChanges();
  
        // Assert
        fixture.whenStable().then(() => {
          let everyInputsEnabled : boolean = areAllInputsEnabled(inputResults);  
          expect(everyInputsEnabled).toBeTrue();
        });
      }));
  
      it('Should be disabled when round status is announcement', fakeAsync(() => {
        // Arrange
        currentRound.status = RoundStatus.announcement;
  
        // Act
        fixture.detectChanges();
  
        // Assert
        fixture.whenStable().then(() => {
          let everyInputsEnabled : boolean = areAllInputsDisabled(inputResults);
  
          expect(everyInputsEnabled).toBeTrue();
        });
      }));
    });
    
    describe('Input announcement field', () => {
      let inputAnnouncements: DebugElement[];
  
      beforeEach(async() => {
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
          expect(areAllInputsDisabled(inputAnnouncements)).toBeTrue();
        });
      }));
    });
  });

  describe('Round total field', () => {
    let game: Game;

    beforeEach(() => {
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
      game.currentRound = 0;
      game.start();
      component.game = game;

    });

    it('should be there when announcements and results are sets', () => {
      // Arrange
      setRoundScore(game, 0, '1', 2, 1);

      // Act
      fixture.detectChanges();

      // Assert
      let {debugElement} = fixture;
      let rows = debugElement.queryAll(By.css('tbody tr'));

      let row = rows[0];
      let roundScore = row.query(By.css('td.mat-column-' + '1'));
      expect(roundScore).toBeTruthy();

      let total = roundScore.query(By.css('.total'));
      expect(total).toBeTruthy();
      expect(total.nativeElement.textContent.trim()).toEqual('-10');

    });

    it('should not be there when announcement is empty', () => {
      // Arrange
      setRoundScore(game, 0, '1', null, 1);

      // Act
      fixture.detectChanges();

      // Assert
      let {debugElement} = fixture;
      let rows = debugElement.queryAll(By.css('tbody tr'));

      let row = rows[0];
      let roundScore = row.query(By.css('td.mat-column-' + '1'));
      expect(roundScore).toBeTruthy();

      let total = roundScore.query(By.css('.total'));
      expect(total).toBeFalsy();
    });

    it('should not be there when result is empty', () => {
      // Arrange
      setRoundScore(game, 0, '1', 2, null);

      // Act
      fixture.detectChanges();

      // Assert
      let {debugElement} = fixture;
      let rows = debugElement.queryAll(By.css('tbody tr'));

      let row = rows[0];
      let roundScore = row.query(By.css('td.mat-column-' + '1'));
      expect(roundScore).toBeTruthy();

      let total = roundScore.query(By.css('.total'));
      expect(total).toBeFalsy();
    });
  });

  describe('Total field', () => {
    let game: Game;

    beforeEach(() => {
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
      game.currentRound = 2;
      game.start();
      component.game = game;

    });

    it('should be there on current and previous rounds', () => {
      // Arrange
      setRoundScore(game, 0, '1', 2, 1);

      // Act
      fixture.detectChanges();

      // Assert
      let {debugElement} = fixture;
      let rows = debugElement.queryAll(By.css('tbody tr')).slice(0, game.currentRound + 1);
      expect(rows).toHaveSize(game.currentRound + 1);

      rows.forEach(row => {
        let roundScore = row.queryAll(By.css('.totalSum'));
        expect(roundScore).toHaveSize(game.players.length)
      });
    });

    it('should not be there on unplayed rounds', () => {
      // Arrange
      setRoundScore(game, 0, '1', 2, 1);

      // Act
      fixture.detectChanges();

      // Assert
      let {debugElement} = fixture;
      let rows = debugElement.queryAll(By.css('tbody tr')).slice(game.currentRound + 1);
      expect(rows).toHaveSize(game.rounds.length - (game.currentRound + 1));

      rows.forEach(row => {
        let roundScore = row.queryAll(By.css('.totalSum'));
        expect(roundScore).toHaveSize(0)
      });
    });

    it('should have the sum of all previous + current total', () => {
      // Arrange
      setRoundScore(game, 0, '1', 2, 1);
      setRoundScore(game, 1, '1', 2, 1);
      setRoundScore(game, 2, '1', 2, 1);

      // Act
      fixture.detectChanges();

      // Assert
      let {debugElement} = fixture;
      let rows = debugElement.queryAll(By.css('tbody tr')).slice(0, game.currentRound + 1);
      expect(rows).toHaveSize(game.currentRound + 1);

      rows.forEach((row, idx) => {
        let roundScore = row.query(By.css('td.mat-column-1 .totalSum'));
        expect(roundScore).toBeTruthy();
        expect(roundScore.nativeElement.textContent.trim()).toEqual(game.getTotalForPlayer('1', idx).toString());
      });
    });
  });
});

function areAllInputsDisabled(inputs: DebugElement[]):boolean{
  return inputs
          .map(input => input.nativeElement.disabled)
          .every(disabled => disabled === true);
}

function areAllInputsEnabled(inputs: DebugElement[]):boolean{
  return inputs
          .map(input => input.nativeElement.disabled)
          .every(disabled => disabled === false);
}