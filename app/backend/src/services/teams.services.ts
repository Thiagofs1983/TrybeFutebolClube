import Team from "../database/models/team";

class TeamsServices {
  team = Team;

  public async getAll(): Promise<Team[]> {
    const teams = await this.team.findAll();
    return teams;
  }
}

export default TeamsServices;