import ValidationError from '../errors/validation.erros';

export class Password {
  private _value: string;

  constructor(password: string) {
    this._value = password;
    this.validatePassword();
  }

  private validatePassword() {
    const isPasswordValid = this._value;
  
    if(isPasswordValid.length <= 6) {
      throw new ValidationError(400, "INVALID_PASSWORD");
    }
  }

  get value(): string {
    return this._value;
  }
}