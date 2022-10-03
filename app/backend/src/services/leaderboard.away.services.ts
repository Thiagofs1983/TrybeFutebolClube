import { IStatistic } from '../interfaces';
import TeamsServices from './teams.services';
import MatchesServices from './matches.services';
import LeaderboardsAway from '../entities/Leaderboard.away';

class LeaderboardAwayServices {
  private teams = new TeamsServices();
  private matches = new MatchesServices();

  private async generateStatistic(): Promise<IStatistic[]> {
    const matchesH = await this.matches.matchesInProgress(false); // Recebe apenas partidas que ja finalizaram
    const allTeams = await this.teams.getAll();
    return allTeams.map((team) => {
      const matchesFilter = matchesH.filter((match) => match.awayTeam === team.id);
      const statistics = {
        name: team.teamName,
        totalPoints: new LeaderboardsAway(matchesFilter).totalPoints(),
        totalGames: new LeaderboardsAway(matchesFilter).totalGames(team),
        totalVictories: new LeaderboardsAway(matchesFilter).totalVictories(),
        totalDraws: new LeaderboardsAway(matchesFilter).totalDraws(),
        totalLosses: new LeaderboardsAway(matchesFilter).totalLosses(),
        goalsFavor: new LeaderboardsAway(matchesFilter).goalsFavor(team),
        goalsOwn: new LeaderboardsAway(matchesFilter).goalsOwn(team),
        goalsBalance: new LeaderboardsAway(matchesFilter).goalsBalance(team),
        efficiency: new LeaderboardsAway(matchesFilter).efficiency(team),
      };
      return statistics;
    });
  }

  public async leaderboardAway(): Promise<IStatistic[]> {
    const statistic = await this.generateStatistic();
    const classification = statistic.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return classification;
  }
}

export default LeaderboardAwayServices;
