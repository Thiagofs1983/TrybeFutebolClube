import { Request, Response } from "express";
import MatchesServices from "../services/matches.services";

class MatchesControllers {
  constructor(private matche = new MatchesServices()) { };

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const mathes = await this.matche.getAll();
    res.status(200).json(mathes);
  }
}

export default MatchesControllers