import { RoundScore } from "./round-score";

export class Round {
  nbCards: number;
  roundScores: Map<String, RoundScore>;
  
  constructor(nbCards: number){
    this.nbCards = nbCards;
    this.roundScores = new Map();
  }
}
