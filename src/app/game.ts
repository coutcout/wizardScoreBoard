import { v4 as uuidv4 } from 'uuid';
import { Player } from './player';
import { Round } from './round';

export class Game {
    id: string;
    status: GameStatus;
    players: Player[];
    nbCards: number;
    rounds: Round[];
    
    constructor(){
        this.id = uuidv4();
        this.nbCards = 60;
        this.status = GameStatus.PlayerSelection;
        this.players = [];
        this.rounds = [];
    }

    start() {
        const nbRound = this.nbCards / this.players.length;
        for(let i = 0; i < nbRound; ++i){
            this.rounds.push(new Round());
        }
    }
}

export enum GameStatus {
    PlayerSelection,
    Running,
    Ended

}