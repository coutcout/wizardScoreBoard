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
});
