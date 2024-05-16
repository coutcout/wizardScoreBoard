import { Player } from './player';
import { Round } from './round';

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
      round.roundScores.set('a', {player:new Player(), announcement: 2, result:null});
      round.roundScores.set('b', {player:new Player(), announcement: 3, result:null});
      
      // Act
      let total = round.getTotalOfAnnouncement();

      // Assert
      expect(total).toEqual(5);

    });

    it('should return the total of annoucements with empty annoucements', () => {
      // Arrange
      let round: Round = new Round(4);
      round.roundScores.set('a', {player:new Player(), announcement: 2, result:null});
      round.roundScores.set('b', {player:new Player(), announcement: null, result:null});
      
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
      round.roundScores.set('a', {player:new Player(), announcement: 2, result:null});
      round.roundScores.set('b', {player:new Player(), announcement: 3, result:null});
      
      // Act
      let isValid = round.isAnnouncementValid();

      // Assert
      expect(isValid).toBeTrue();

    });

    it('should be false if total of announcements is equal to number of cards', () => {
      // Arrange
      let round: Round = new Round(4);
      round.roundScores.set('a', {player:new Player(), announcement: 2, result:null});
      round.roundScores.set('b', {player:new Player(), announcement: 2, result:null});
      
      // Act
      let isValid = round.isAnnouncementValid();

      // Assert
      expect(isValid).toBeFalse();

    });
  });
});
