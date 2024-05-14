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
      it(`should create ${testCase.expectedRounds} when game has ${testCase.nbCards} cards and ${testCase.nbPlayers} players`, () => {
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

    })
  });
});
