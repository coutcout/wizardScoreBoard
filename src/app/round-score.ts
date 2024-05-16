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
}
