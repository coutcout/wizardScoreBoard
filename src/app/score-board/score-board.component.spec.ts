import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoardComponent } from './score-board.component';
import { Game } from '../game';
import { By } from '@angular/platform-browser';

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
    let firstCols = debugElement.queryAll(By.css('tbody tr td:first-child'));
    firstCols.forEach((col, idx) => {
      const nativeElement: HTMLElement = col.nativeElement;
      expect(nativeElement.textContent).toEqual((idx + 1).toString());
    });
  });

  it('should have a column for each player', () => {
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
    let playerHeaders = debugElement.queryAll(By.css('thead tr:first-child th')).slice(1);
    let playerHeadersNickname = playerHeaders
      .map(
        pHeader => {
          const nativeElement: HTMLElement = pHeader.nativeElement;
          return nativeElement.textContent;
        }
      )
      .filter(pHeader => !!pHeader)
      .sort((a, b) => a!.localeCompare(b!));
    
    let playerNicknames = game.players
      .map(p => p.nickname)
      .filter(pHeader => pHeader)
      .sort((a, b) => a.localeCompare(b));;
    expect(playerHeadersNickname).toEqual(playerNicknames);
  });
});
