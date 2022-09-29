import Team from "../database/models/team";
import Matche from "../database/models/matche";

class MatchesServices {
  matche = Matche;

  public async getAll(): Promise<Matche[]> {
    const matches = await this.matche.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }
      ]
    });
    return matches;
  }
}

export default MatchesServices;