import { v4 as uuidv4 } from 'uuid';

export class Player {
    id: string;
    nickname: string;

    constructor(){
        this.id = uuidv4();
        this.nickname = "";
    }

    toString(): string {
        return JSON.stringify(this);
    }

    static parsePlayer(player: any): Player{
        let p : Player = new Player();
        return Object.assign(p, player);
    }
}
