import CustomError from '../errors/custom.erros';
import Team from '../database/models/team';

class TeamModel {
  constructor(private team = Team) { }

  public async findAll(): Promise<Team[]> {
    const teams = await this.team.findAll();
    return teams;
  }

  public async findByPk(id: number): Promise<Team> {
    const team = await this.team.findByPk(id);
    if (!team) throw new CustomError(400, 'Team not found');
    return team;
  }
}

export default TeamModel;
