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
    console.log(fixture);
    let rows = debugElement.queryAll(By.css('tbody tr'));
    expect(rows).toHaveSize(30);
  });

  fit('should have the round number at first column', () => {
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
    console.log(fixture);
    let firstCols = debugElement.queryAll(By.css('tbody tr td:first-child'));
    firstCols.forEach((col, idx) => {
      const nativeElement: HTMLElement = col.nativeElement;
      expect(nativeElement.textContent).toEqual((idx + 1).toString());
    });


  })
});
