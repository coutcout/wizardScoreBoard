import { Player } from './player';
import { Round } from './round';
import { RoundScore } from './round-score';

describe('Round', () => {
  it('should create an instance', () => {
    const round = new Round(0);
    expect(round).toBeTruthy();
    expect(round.nbCards).toEqual(0);
  });

  describe('getTotalOfAnnouncement', () => {
    it('should return the total of annoucements', () => {
      // Arrange
      let round: Round = new Round(4);
      let player1 = new Player();
      round.roundScores.set('a', createRoundScore(player1, 2, null));
      let player2 = new Player();
      round.roundScores.set('b', createRoundScore(player2, 3, null));
      
      // Act
      let total = round.getTotalOfAnnouncement();

      // Assert
      expect(total).toEqual(5);

    });

    it('should return the total of annoucements with empty annoucements', () => {
      // Arrange
      let round: Round = new Round(4);
      let player1 = new Player();
      round.roundScores.set('a', createRoundScore(player1, 2, null));
      let player2 = new Player();
      round.roundScores.set('b', createRoundScore(player2, null, null));
      
      // Act
      let total = round.getTotalOfAnnouncement();

      // Assert
      expect(total).toEqual(2);
    });
  });

  describe('isAnnouncementValid', () => {
    it('should be true if total of announcements is not equal to number of cards', () => {
      // Arrange
      let round: Round = new Round(4);
      let player1 = new Player();
      round.roundScores.set('a', createRoundScore(player1, 2, null));
      let player2 = new Player();
      round.roundScores.set('b', createRoundScore(player2, 3, null));
      
      // Act
      let isValid = round.isAnnouncementValid();

      // Assert
      expect(isValid).toBeTrue();

    });

    it('should be false if total of announcements is equal to number of cards', () => {
      // Arrange
      let round: Round = new Round(4);
      let player1 = new Player();
      round.roundScores.set('a', createRoundScore(player1, 2, null));
      let player2 = new Player();
      round.roundScores.set('b', createRoundScore(player2, 2, null));
      
      // Act
      let isValid = round.isAnnouncementValid();

      // Assert
      expect(isValid).toBeFalse();

    });
  });
});

function createRoundScore(player: Player, announcement: number | null, result: number | null) : RoundScore{
  let rs = new RoundScore(player);
  rs.announcement = announcement;
  rs.result = result;

  return rs;
}