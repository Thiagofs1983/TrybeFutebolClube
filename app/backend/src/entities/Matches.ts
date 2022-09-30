import HttpValidateError from '../errors/validation.erros';
import { IMatches } from '../interfaces';

class Matches {
  private _match: IMatches;

  constructor(match: IMatches) {
    this._match = match;
    this.validateMatch();
  }

  private validateMatch() {
    if (this._match.awayTeam === this._match.homeTeam) {
      throw new HttpValidateError(401, 'It is not possible to create a match with two equal teams');
    }
  }

  public get match(): IMatches {
    return this._match;
  }
}

export default Matches;
