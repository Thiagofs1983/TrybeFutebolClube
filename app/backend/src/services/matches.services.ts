import Team from "../database/models/team";
import Matche from "../database/models/matche";
import { IMatches, ISimpleMatches } from "../interfaces";
import HttpValidateError from "../errors/validation.erros";
import Matches from "../entities/Matches";
import { Op } from "sequelize";

class MatchesServices {
  matche = Matche;
  team = Team;

  public async getAll() {
    const matches = await this.matche.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }
      ]
    });
    return matches;
  }

  public async matchesInProgress(inProgress: boolean): Promise<Matche[]> {
    const matches = await this.matche.findAll({ where: { inProgress }, include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }
    ] })
    return matches;
  }

  public async createNewMatche(matche: IMatches): Promise<Matche> {
    const match = new Matches(matche).match
    const teamExists = await this.team.findAll({ where: { [Op.or]: [{ id: match.homeTeam }, { id: match.awayTeam }] } })
    if (teamExists.length !== 2) throw new HttpValidateError(404, 'There is no team with such id!');
    
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

  public async updateMatches(date: ISimpleMatches, id: number): Promise<void> {
    const [match] = await this.matche.update(
      { awayTeamGoals: date.awayTeamGoals, homeTeamGoals: date.homeTeamGoals },
      { where: { id } }
    );
    if (match === 0) throw new HttpValidateError(400, 'It is not possible to update a match')
  }
}

export default MatchesServices;