import { v4 as uuidv4 } from 'uuid';

export class Game {
    id: string;
    status: GameStatus;

    constructor(){
        this.id = uuidv4();
        this.status = GameStatus.PlayerSelection;
    }

    public isPlayerSelectionPhase() : Boolean {
        return this.status === GameStatus.PlayerSelection;
    }
}

export enum GameStatus {
    PlayerSelection,
    Running,
    Ended

}