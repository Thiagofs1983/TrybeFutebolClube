import { Request, Response } from 'express';
import LeaderboardFilterServices from '../services/leaderboard.home.away.services';
import LeaderboardServices from '../services/leaderboard.services ';

class LeaderboardControllers {
  constructor(
    private leaderboardsFilter = new LeaderboardFilterServices(),
    private leaderboards = new LeaderboardServices(),
  ) { }

  public leaderboardHome = async (req: Request, res: Response) => {
    const result = await this.leaderboardsFilter.leaderboard('homeTeam');
    res.status(200).json(result);
  };

  public leaderboardAway = async (req: Request, res: Response) => {
    const result = await this.leaderboardsFilter.leaderboard('awayTeam');
    res.status(200).json(result);
  };

  public leaderboard = async (req: Request, res: Response) => {
    const result = await this.leaderboards.leaderboard();
    res.status(200).json(result);
  };
}

export default LeaderboardControllers;
