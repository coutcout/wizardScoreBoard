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
  
  getTotalOfAnnouncement(){
    return Array.from(this.roundScores.values())
    .map(roundScore => roundScore.announcement)
    .filter(announcement => !!announcement)
    .reduce((sum, current) => sum! + current!, 0);
  }

  isAnnouncementValid() {
    return this.getTotalOfAnnouncement() !== this.nbCards;
  }
}

export enum RoundStatus{
  announcement,
  results
}
