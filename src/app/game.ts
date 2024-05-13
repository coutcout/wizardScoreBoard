import { v4 as uuidv4 } from 'uuid';
import { Player } from './player';

export class Game {
    id: string;
    status: GameStatus;
    players: Player[];

    constructor(){
        this.id = uuidv4();
        this.status = GameStatus.PlayerSelection;
        this.players = [];
    }
}

export enum GameStatus {
    PlayerSelection,
    Running,
    Ended

}