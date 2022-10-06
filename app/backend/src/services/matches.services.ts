import { IMatches, ISimpleMatches } from '../interfaces';
import Matches from '../entities/Matches';
import MatchModel from '../models/matches.model';
import CustomError from '../errors/custom.erros';

class MatchesServices {
  constructor(private match = new MatchModel()) { }

  public async getAll(): Promise<IMatches[]> {
    const matches = await this.match.findAll();
    return matches;
  }

  public async matchesInProgress(inProgress: boolean): Promise<IMatches[]> {
    const matches = await this.match.findAllMatchesInProgress(inProgress);
    return matches;
  }

  public async createNewMatche(matche: IMatches): Promise<IMatches> {
    const { match } = new Matches(matche);
    const teamExists = await this.match.findAllCreate(match);
    if (teamExists.length < 2) throw new CustomError(404, 'There is no team with such id!');

    const newMatche = await this.match.createNewMatche(match);

    return newMatche;
  }

  public async updateInProgress(id: number): Promise<void> {
    await this.match.updateInProgress(id);
  }

  public async updateMatches(date: ISimpleMatches, id: number): Promise<void> {
    await this.match.updateMatches(date, id);
  }
}

export default MatchesServices;
