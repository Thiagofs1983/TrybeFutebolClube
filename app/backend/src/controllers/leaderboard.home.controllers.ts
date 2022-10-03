import { Request, Response } from 'express';
import LeaderboardHomeServices from '../services/leaderboard.home.services';

class LeaderboardHomeControllers {
  constructor(private leaderboardsHome = new LeaderboardHomeServices()) { }

  public leaderboardHome = async (req: Request, res: Response) => {
    const result = await this.leaderboardsHome.leaderboardHome();
    res.status(200).json(result);
  };
}

export default LeaderboardHomeControllers;
