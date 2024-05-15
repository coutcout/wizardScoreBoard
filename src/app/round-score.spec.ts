import { Player } from './player';
import { RoundScore } from './round-score';

describe('RoundScore', () => {
  it('should create an instance', () => {
    const player = new Player();

    const roundScore = new RoundScore(player);
    expect(roundScore).toBeTruthy();
    expect(roundScore.player).toEqual(player);
  });
});
