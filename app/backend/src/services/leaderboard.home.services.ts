import { IStatistic } from '../interfaces';
import LeaderboardsHome from '../entities/Leaderboard.home';
import TeamsServices from './teams.services';
import MatchesServices from './matches.services';

class LeaderboardHomeServices {
  private teams = new TeamsServices();
  private matches = new MatchesServices();

  private async generateStatistic(): Promise<IStatistic[]> {
    const matchesH = await this.matches.matchesInProgress(false); // Recebe apenas partidas que ja finalizaram
    const allTeams = await this.teams.getAll();
    return allTeams.map((team) => {
      const matchesFilter = matchesH.filter((match) => match.homeTeam === team.id);
      const statistics = {
        name: team.teamName,
        totalPoints: new LeaderboardsHome(matchesFilter).totalPoints(),
        totalGames: new LeaderboardsHome(matchesFilter).totalGames(team),
        totalVictories: new LeaderboardsHome(matchesFilter).totalVictories(),
        totalDraws: new LeaderboardsHome(matchesFilter).totalDraws(),
        totalLosses: new LeaderboardsHome(matchesFilter).totalLosses(),
        goalsFavor: new LeaderboardsHome(matchesFilter).goalsFavor(team),
        goalsOwn: new LeaderboardsHome(matchesFilter).goalsOwn(team),
        goalsBalance: new LeaderboardsHome(matchesFilter).goalsBalance(team),
        efficiency: new LeaderboardsHome(matchesFilter).efficiency(team),
      };
      return statistics;
    });
  }

  public async leaderboardHome(): Promise<IStatistic[]> {
    const statistic = await this.generateStatistic();
    const classification = statistic.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return classification;
  }
}

export default LeaderboardHomeServices;
