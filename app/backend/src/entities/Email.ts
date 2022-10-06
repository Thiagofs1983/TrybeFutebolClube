import CustomError from '../errors/custom.erros';

export default class Email {
  private _value: string;

  constructor(email: string) {
    this._value = email;
    this.validateEmail();
  }

  private validateEmail() {
    const email = this._value;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email) {
      throw new CustomError(400, 'All fields must be filled');
    }
    if (!emailRegex.test(email)) {
      throw new CustomError(400, '"email" must be a valid email');
    }
  }

  get value(): string {
    return this._value;
  }
}
