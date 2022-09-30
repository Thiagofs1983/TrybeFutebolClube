import { Request, Response } from 'express';
import TeamsServices from '../services/teams.services';

class TeamsControllers {
  constructor(private team = new TeamsServices()) { }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const teams = await this.team.getAll();
    res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const team = await this.team.getById(id);
    res.status(200).json(team);
  };
}

export default TeamsControllers;
