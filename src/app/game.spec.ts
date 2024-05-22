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

    it('Should throw an Error if no player', () => {
      // Arrange
      let game: Game = new Game();

      // Act / Assert
      expect(() => game.start()).toThrow(new Error("Cannot start a game without player"));

    });
  });

  describe('getTotalForPlayer', () => {
    [
      {'roundNumber': 0, 'expectedResult': 10},
      {'roundNumber': 1, 'expectedResult': 0},
      {'roundNumber': 2, 'expectedResult': 30},
    ].forEach(testCase => {
      it(`should return the sum of rounds total before or equal the parameter round. roundNumber: ${testCase.roundNumber}`, () => {
        // Arrange
        let game: Game = new Game();
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
        setRoundScore(game, 0, '1', 0, 0);
        setRoundScore(game, 1, '1', 1, 2);
        setRoundScore(game, 2, '1', 2, 2);
  
        // Act
        let res = game.getTotalForPlayer('1', testCase.roundNumber);
  
        // Assert
        expect(res).toEqual(testCase.expectedResult);
      });
    })
  });
});

export function setRoundScore(game: Game, roundNumber: number, playerId: string, annoucement: number | null, result: number | null) {
  let roundScore = game.rounds[roundNumber].roundScores.get(playerId);
  roundScore!.announcement = annoucement;
  roundScore!.result = result;
}