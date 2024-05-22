import { Player } from "./player";

export class RoundScore {
    player: Player;
    announcement: number | null;
    result: number | null;
    
    constructor(player: Player){
        this.player = player;
        this.announcement = null;
        this.result = null;
    }

    getTotal() {
        if(this.announcement === null || this.result === null){
            return 0;
        }

        if(this.announcement === this.result){
            const base = 10;
            return base + this.result * 10;
        } else {
            let res = Math.abs(this.result - this.announcement);
            return res * 10 * -1;
        }
        
    }
}
