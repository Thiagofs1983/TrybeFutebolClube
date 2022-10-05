import Team from '../database/models/team';
import Matche from '../database/models/matche';

class Leaderboards {
  private matchesFilter: Matche[];

  constructor(matchesFilter: Matche[]) {
    this.matchesFilter = matchesFilter;
  }

  public totalPoints(team: Team) {
    let points = 0;
    this.matchesFilter.forEach((match) => {
      if (team.id === match.homeTeam) {
        if (match.homeTeamGoals > match.awayTeamGoals) points += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
      }
      if (team.id === match.awayTeam) {
        if (match.homeTeamGoals < match.awayTeamGoals) points += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
      }
    });
    return points;
  }

  public totalGames(team: Team) {
    let games = 0;
    this.matchesFilter.forEach((match) => {
      if (match.awayTeam === team.id || match.homeTeam === team.id) games += 1;
    });
    return games;
  }

  public totalVictories(team: Team) {
    let victories = 0;
    this.matchesFilter.forEach((match) => {
      if (team.id === match.awayTeam
        && match.homeTeamGoals < match.awayTeamGoals) victories += 1;
      if (team.id === match.homeTeam
        && match.homeTeamGoals > match.awayTeamGoals) victories += 1;
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

  public totalLosses(team: Team) {
    let losses = 0;
    this.matchesFilter.forEach((match) => {
      if (team.id === match.awayTeam
        && match.homeTeamGoals > match.awayTeamGoals) losses += 1;
      if (team.id === match.homeTeam
        && match.homeTeamGoals < match.awayTeamGoals) losses += 1;
    });
    return losses;
  }

  public goalsFavor(team: Team) {
    let goals = 0;
    this.matchesFilter.forEach((match) => {
      if (team.id === match.awayTeam
        && match.awayTeam === team.id) goals += match.awayTeamGoals;
      if (team.id === match.homeTeam
        && match.homeTeam === team.id) goals += match.homeTeamGoals;
    });
    return goals;
  }

  public goalsOwn(team: Team) {
    let goals = 0;
    this.matchesFilter.forEach((match) => {
      if (team.id === match.awayTeam
        && match.awayTeam === team.id) goals += match.homeTeamGoals;
      if (team.id === match.homeTeam
        && match.homeTeam === team.id) goals += match.awayTeamGoals;
    });
    return goals;
  }

  public goalsBalance(team: Team) {
    const goalsFavor = this.goalsFavor(team);
    const goalsOwn = this.goalsOwn(team);
    const total = goalsFavor - goalsOwn;
    return total;
  }

  public efficiency(team: Team) {
    const points = this.totalPoints(team);
    const games = this.totalGames(team);
    return ((points / (games * 3)) * 100).toFixed(2);
  }
}

export default Leaderboards;
