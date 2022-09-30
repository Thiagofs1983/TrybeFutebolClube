import HttpValidateError from '../errors/validation.erros';
import Team from '../database/models/team';

class TeamsServices {
  team = Team;

  public async getAll(): Promise<Team[]> {
    const teams = await this.team.findAll();
    return teams;
  }

  public async getById(id: number): Promise<Team> {
    const team = await this.team.findByPk(id);
    if (!team) throw new HttpValidateError(400, 'Team not found');
    return team;
  }
}

export default TeamsServices;
