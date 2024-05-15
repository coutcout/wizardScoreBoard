import { v4 as uuidv4 } from 'uuid';
import { Player } from './player';
import { Round } from './round';
import { RoundScore } from './round-score';

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
        if(this.players.length === 0){
            throw new Error("Cannot start a game without player");
        }
        this.status = GameStatus.Running;
        const nbRound = Math.floor(this.nbCards / this.players.length);
        for(let i = 0; i < nbRound; ++i){
            const nbCards = i + 1;
            const round = new Round(nbCards);
            this.rounds.push(round);
            this.players.forEach(player => {
                round.roundScores.set(player.id, new RoundScore(player));
            });
        }
    }

    getPlayersId(){
        return this.players.map(p => p.id);
    }
}

export enum GameStatus {
    PlayerSelection,
    Running,
    Ended

}