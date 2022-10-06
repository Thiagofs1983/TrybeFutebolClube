import { IStatistic } from '../interfaces';
import TeamsServices from './teams.services';
import MatchesServices from './matches.services';
import Leaderboards from '../entities/Leaderboars';

class LeaderboardServices {
  constructor(private teams = new TeamsServices(), private matches = new MatchesServices()) { }

  private async generateStatistic(): Promise<IStatistic[]> {
    const matchesH = await this.matches.matchesInProgress(false); // Recebe apenas partidas que ja finalizaram
    const allTeams = await this.teams.getAll();
    return allTeams.map((team) => {
      const matchesFilter = matchesH.filter((match) => match.awayTeam === team.id
        || match.homeTeam === team.id);
      return {
        name: team.teamName,
        totalPoints: new Leaderboards(matchesFilter).totalPoints(team),
        totalGames: new Leaderboards(matchesFilter).totalGames(team),
        totalVictories: new Leaderboards(matchesFilter).totalVictories(team),
        totalDraws: new Leaderboards(matchesFilter).totalDraws(),
        totalLosses: new Leaderboards(matchesFilter).totalLosses(team),
        goalsFavor: new Leaderboards(matchesFilter).goalsFavor(team),
        goalsOwn: new Leaderboards(matchesFilter).goalsOwn(team),
        goalsBalance: new Leaderboards(matchesFilter).goalsBalance(team),
        efficiency: new Leaderboards(matchesFilter).efficiency(team),
      };
    });
  }

  public async leaderboard(): Promise<IStatistic[]> {
    const statistic = await this.generateStatistic();
    const classification = statistic.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return classification;
  }
}

export default LeaderboardServices;
