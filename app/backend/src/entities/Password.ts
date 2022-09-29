import HttpValidateError from '../errors/validation.erros';

export class Password {
  private _value: string;

  constructor(password: string) {
    this._value = password;
    this.validatePassword();
  }

  public validatePassword() {
    const isPasswordValid = this._value;
    console.log(isPasswordValid);
    
    if(!isPasswordValid) {
      throw new HttpValidateError(400, 'All fields must be filled');
    }
  }

  get value(): string {
    return this._value;
  }
}