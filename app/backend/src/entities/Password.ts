import HttpValidateError from '../errors/validation.erros';

export default class Password {
  private _value: string;

  constructor(password: string) {
    this._value = password;
    this.validatePassword();
  }

  public validatePassword() {
    const isPasswordValid = this._value;

    if (!isPasswordValid) {
      throw new HttpValidateError(400, 'All fields must be filled');
    }
    if (isPasswordValid.length <= 6) {
      throw new HttpValidateError(400, '"password" length must be at least 7 characters long');
    }
  }

  get value(): string {
    return this._value;
  }
}
