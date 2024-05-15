import { Round } from './round';

describe('Round', () => {
  it('should create an instance', () => {
    const round = new Round(0);
    expect(round).toBeTruthy();
    expect(round.nbCards).toEqual(0);
  });
});
