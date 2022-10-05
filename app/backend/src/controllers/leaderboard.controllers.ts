import { Request, Response } from 'express';
import LeaderboardAwayServices from '../services/leaderboard.away.services';
import LeaderboardHomeServices from '../services/leaderboard.home.services';
import LeaderboardServices from '../services/leaderboard.services ';

class LeaderboardControllers {
  constructor(
    private leaderboardsHome = new LeaderboardHomeServices(),
    private leaderboardsAway = new LeaderboardAwayServices(),
    private leaderboards = new LeaderboardServices(),
  ) { }

  public leaderboardHome = async (req: Request, res: Response) => {
    const result = await this.leaderboardsHome.leaderboardHome();
    res.status(200).json(result);
  };

  public leaderboardAway = async (req: Request, res: Response) => {
    const result = await this.leaderboardsAway.leaderboardAway();
    res.status(200).json(result);
  };

  public leaderboard = async (req: Request, res: Response) => {
    const result = await this.leaderboards.leaderboard();
    res.status(200).json(result);
  };
}

export default LeaderboardControllers;
