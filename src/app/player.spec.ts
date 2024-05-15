import { Player } from './player';

describe('Player', () => {
  it('should create an instance', () => {
    expect(new Player()).toBeTruthy();
  });

  it('should be stringify', () => {
    // Arrange
    let player: Player = new Player();
    player.nickname = "test";

    // Act
    let stringPlayer : string = player.toString();

    // Assert
    expect(stringPlayer).toEqual(JSON.stringify(player));
  });

  describe('ParsePlayer', () => {
    it('should create a Player', () => {
      // Arrange
      let jsonPlayer = {
        id: '1',
        nickname: 'test'
      };

      // Act
      let parsedPlayer = Player.parsePlayer(jsonPlayer);

      // Assert
      expect(parsedPlayer.id).toEqual('1');
      expect(parsedPlayer.nickname).toEqual('test');
    });
  });
});
