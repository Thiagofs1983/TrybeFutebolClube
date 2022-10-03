import Team from '../database/models/team';
import Matche from '../database/models/matche';

class LeaderboardsAway {
  private matchesFilter: Matche[];

  constructor(matchesFilter: Matche[]) {
    this.matchesFilter = matchesFilter;
  }

  public totalPoints() {
    let points = 0;
    this.matchesFilter.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) points += 3;
      if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
    });
    return points;
  }

  public totalGames(team: Team) {
    let games = 0;
    this.matchesFilter.forEach((match) => {
      if (match.awayTeam === team.id) games += 1;
    });
    return games;
  }

  public totalVictories() {
    let victories = 0;
    this.matchesFilter.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) victories += 1;
    });
    return victories;
  }

  public totalDraws() {
    let draws = 0;
    this.matchesFilter.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
    });
    return draws;
  }

  public totalLosses() {
    let losses = 0;
    this.matchesFilter.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) losses += 1;
    });
    return losses;
  }

  public goalsFavor(team: Team) {
    let goals = 0;
    this.matchesFilter.forEach((match) => {
      if (match.awayTeam === team.id) goals += match.awayTeamGoals;
    });
    return goals;
  }

  public goalsOwn(team: Team) {
    let goals = 0;
    this.matchesFilter.forEach((match) => {
      if (match.awayTeam === team.id) goals += match.homeTeamGoals;
    });
    return goals;
  }

  public goalsBalance(team: Team) {
    let goalsFavor = 0;
    let goalsOwn = 0;
    this.matchesFilter.forEach((match) => {
      if (match.awayTeam === team.id) goalsFavor += match.awayTeamGoals;
    });
    this.matchesFilter.forEach((match) => {
      if (match.awayTeam === team.id) goalsOwn += match.homeTeamGoals;
    });
    const total = goalsFavor - goalsOwn;
    return total;
  }

  public efficiency(team: Team) {
    // P/(J*3)*100
    let points = 0;
    let games = 0;
    this.matchesFilter.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) points += 3;
      if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
    });
    this.matchesFilter.forEach((match) => {
      if (match.awayTeam === team.id) games += 1;
    });
    return ((points / (games * 3)) * 100).toFixed(2);
  }
}

export default LeaderboardsAway;
