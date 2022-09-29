import { Email } from '../entities/Email';
import { Password } from '../entities/Password';
import { Ilogin } from '../interfaces';
import * as bcrypt from 'bcryptjs'
import User from '../database/models/user'
import HttpValidateError from '../errors/validation.erros';
import generateToken from '../utils/generateToken';

class UserServices {
  user = User;

  public async loginService(login: Ilogin): Promise<string> {
    const { email, password } = login;
    const emailValidate = new Email(email).value;
    const passwordValidate = new Password(password).value
    const user = await this.user.findOne({ where: { email } })
    if (!user) {
      throw new HttpValidateError(401, 'Incorrect email or password');
    }
    const token = generateToken(emailValidate);
    return token;
  }
}

export default UserServices;