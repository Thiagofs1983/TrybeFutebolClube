import HttpValidateError from '../errors/validation.erros';

export class Email {
  private _value: string;

  constructor(email: string) {
    this.validateEmail();
    this._value = email;
  }

  private validateEmail() {
    const email = this._value;
  
    if(!email) {
      throw new HttpValidateError(400, 'All fields must be filled');
    }
  }

  get value(): string {
    return this._value;
  }
}