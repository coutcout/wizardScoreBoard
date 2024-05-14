import { Player } from './player';
import { RoundScore } from './round-score';

describe('RoundScore', () => {
  it('should create an instance', () => {
    expect(new RoundScore(new Player())).toBeTruthy();
  });
});
