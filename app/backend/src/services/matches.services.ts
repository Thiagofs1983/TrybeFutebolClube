import Team from "../database/models/team";
import Matche from "../database/models/matche";
import { IMatches } from "../interfaces";

class MatchesServices {
  matche = Matche;

  public async matchesInProgress(inProgress: boolean): Promise<Matche[]> {
    const matches = await this.matche.findAll({ where: { inProgress }, include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }
    ] })
    return matches;
  }

  public async createNewMatche(matche: IMatches) {
    const newMatche = await this.matche.create({...matche, inProgress: true});
    return newMatche;
  }
}

export default MatchesServices;