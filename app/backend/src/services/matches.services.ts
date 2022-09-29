import Team from "../database/models/team";
import Matche from "../database/models/matche";
import { IMatches } from "../interfaces";
import HttpValidateError from "../errors/validation.erros";
import Matches from "../entities/Matches";

class MatchesServices {
  matche = Matche;

  public async matchesInProgress(inProgress: boolean): Promise<Matche[]> {
    const matches = await this.matche.findAll({ where: { inProgress }, include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }
    ] })
    return matches;
  }

  public async createNewMatche(matche: IMatches): Promise<Matche> {
    const match = new Matches(matche).match
    const newMatche = await this.matche.create({...match, inProgress: true});
    return newMatche;
  }

  public async updateInProgress(id: number): Promise<void> {
    const [matche] = await this.matche.update(
      { inProgress: false},
      { where: { id } }
    );
    if (matche === 0) throw new HttpValidateError(400, 'It is not possible to update a match')
  }
}

export default MatchesServices;