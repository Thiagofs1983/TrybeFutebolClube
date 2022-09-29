import { Request, Response } from "express";
import MatchesServices from "../services/matches.services";

class MatchesControllers {
  constructor(private matche = new MatchesServices()) { };

  public matchesInProgress = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    const progress = (inProgress == 'true');
    const matches = await this.matche.matchesInProgress(progress);
    res.status(200).json(matches);
  }
}

export default MatchesControllers