import { Player } from './player';
import { RoundScore } from './round-score';

describe('RoundScore', () => {
  it('should create an instance', () => {
    const player = new Player();

    const roundScore = new RoundScore(player);
    expect(roundScore).toBeTruthy();
    expect(roundScore.player).toEqual(player);
  });

  describe('getTotal', () => {
    [
      {"announcement":0, "result":0, "expectedTotal": 10},
      {"announcement":1, "result":1, "expectedTotal": 20},
      {"announcement":2, "result":2, "expectedTotal": 30},
      {"announcement":3, "result":3, "expectedTotal": 40},
      {"announcement":0, "result":1, "expectedTotal": -10},
      {"announcement":0, "result":2, "expectedTotal": -20},
      {"announcement":0, "result":3, "expectedTotal": -30},
      {"announcement":1, "result":0, "expectedTotal": -10},
      {"announcement":2, "result":0, "expectedTotal": -20},
      {"announcement":3, "result":0, "expectedTotal": -30},
      {"announcement":1, "result":2, "expectedTotal": -10},
      {"announcement":2, "result":3, "expectedTotal": -10},
      {"announcement":2, "result":4, "expectedTotal": -20},
      {"announcement":4, "result":2, "expectedTotal": -20},
    ].forEach(roundCase => {
      it(`anouncement: ${roundCase.announcement} - result: ${roundCase.result} => ${roundCase.expectedTotal}`, () => {
        // Arrange
        let roundScore: RoundScore = new RoundScore(new Player());
        roundScore.announcement = roundCase.announcement;
        roundScore.result = roundCase.result;

        // Act
        let total = roundScore.getTotal();

        // Assert
        expect(total).toEqual(roundCase.expectedTotal);
      });
    });

    [
      {"announcement":null, "result":3},
      {"announcement":1, "result":null},
    ].forEach(roundCase => {
      it(`anouncement: ${roundCase.announcement} - result: ${roundCase.result} => 0`, () => {
        // Arrange
        let roundScore: RoundScore = new RoundScore(new Player());
        roundScore.announcement = roundCase.announcement;
        roundScore.result = roundCase.result;

        // Act
        let total = roundScore.getTotal();

        // Assert
        expect(total).toEqual(0);
      });
    })
  });
});
