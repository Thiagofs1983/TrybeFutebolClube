import { ITeam } from '../interfaces';
import TeamModel from '../models/team.model';

class TeamsServices {
  constructor(private team = new TeamModel()) { }

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.team.findAll();
    return teams;
  }

  public async getById(id: number): Promise<ITeam> {
    const team = await this.team.findByPk(id);
    return team;
  }
}

export default TeamsServices;
