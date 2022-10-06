import { Op } from 'sequelize';
import Team from '../database/models/team';
import Matche from '../database/models/matche';
import { IMatches, ISimpleMatches } from '../interfaces';
import CustomError from '../errors/custom.erros';
import 'express-async-errors';

class MatchModel {
  constructor(private match = Matche, private team = Team) { }

  public async findAll() {
    const matches = await this.match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async findAllMatchesInProgress(inProgress: boolean) {
    const matches = await this.match.findAll(
      {
        where: { inProgress },
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ] },
    );
    return matches;
  }

  public async findAllCreate(match: IMatches) {
    const teamExists = await this.team
      .findAll({ where: { [Op.or]: [{ id: match.homeTeam }, { id: match.awayTeam }] } });
    return teamExists;
  }

  public async createNewMatche(match: IMatches) {
    const newMatche = await this.match.create({ ...match, inProgress: true });

    return newMatche;
  }

  public async updateInProgress(id: number) {
    const [matche] = await this.match.update(
      { inProgress: false },
      { where: { id } },
    );
    if (matche === 0) throw new CustomError(400, 'It is not possible to update a match');
  }

  public async updateMatches(date: ISimpleMatches, id: number): Promise<void> {
    const [match] = await this.match.update(
      { awayTeamGoals: date.awayTeamGoals, homeTeamGoals: date.homeTeamGoals },
      { where: { id } },
    );
    if (match === 0) throw new CustomError(400, 'It is not possible to update a match');
  }
}

export default MatchModel;
