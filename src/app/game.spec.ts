import { Game } from './game';
import { Player } from './player';

describe('Game', () => {
  it('should create an instance', () => {
    expect(new Game()).toBeTruthy();
  });

  describe('Start method', () => {
    [
      {
        nbPlayers: 2,
        nbCards: 60,
        expectedRounds: 30
      },
      {
        nbPlayers: 7,
        nbCards: 60,
        expectedRounds: 8
      },
    ].forEach(testCase => {
      it(`should create ${testCase.expectedRounds} rounds when game has ${testCase.nbCards} cards and ${testCase.nbPlayers} players`, () => {
        // Arrange
        let game: Game = new Game();

        for(let i = 0; i < testCase.nbPlayers; ++i){
          let player: Player = new Player();
          player.nickname = i.toString();
          game.players.push(player);
        }

        game.nbCards = testCase.nbCards;

        // Act
        game.start();

        // Assert
        expect(game.rounds).toHaveSize(testCase.expectedRounds);
      });

    });

    [
      {
        nbPlayers: 2,
        nbCards: 60,
        expectedRounds: 30
      }
    ].forEach(testCase => {
      it(`should create ${testCase.expectedRounds} rounds with the good number of cards for each round`, () => {
        // Arrange
        let game: Game = new Game();

        for(let i = 0; i < testCase.nbPlayers; ++i){
          let player: Player = new Player();
          player.nickname = i.toString();
          game.players.push(player);
        }

        game.nbCards = testCase.nbCards;

        // Act
        game.start();

        // Assert
        const rounds = game.rounds;
        expect(rounds).toHaveSize(testCase.expectedRounds);
        for(let i = 0; i < testCase.expectedRounds; ++i){
          expect(rounds[i].nbCards).toEqual(i+1);
        }
      });

    });

    [
      {
        nbPlayers: 2,
        nbCards: 2,
        expectedRounds: 1
      }
    ].forEach(testCase => {
      it(`should create a roundScore for each player and each round`, () => {
        // Arrange
        let game: Game = new Game();

        for(let i = 0; i < testCase.nbPlayers; ++i){
          let player: Player = new Player();
          player.nickname = i.toString();
          game.players.push(player);
        }

        game.nbCards = testCase.nbCards;

        // Act
        game.start();

        // Assert
        const rounds = game.rounds;
        expect(rounds).toHaveSize(testCase.expectedRounds);
        const firstRound = game.rounds[0];
        expect(firstRound.roundScores).toHaveSize(game.players.length);
        game.players.forEach(player => {
          expect(firstRound.roundScores.has(player.id)).toBeTrue();
        });
      });

    });
  });
});
