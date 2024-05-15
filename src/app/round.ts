import { RoundScore } from "./round-score";

export class Round {
  nbCards: number;
  roundScores: Map<string, RoundScore>;
  status: RoundStatus;
  
  constructor(nbCards: number){
    this.nbCards = nbCards;
    this.roundScores = new Map();
    this.status = RoundStatus.announcement;
  }
}

export enum RoundStatus{
  announcement,
  results
}
