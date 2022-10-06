import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import Email from '../entities/Email';
import Password from '../entities/Password';
import { Ilogin, IUser } from '../interfaces';
import CustomError from '../errors/custom.erros';
import generateToken from '../utils/generateToken';
import UserModel from '../models/user.model';

class UserServices {
  constructor(private user = new UserModel()) { }

  public async loginService(login: Ilogin): Promise<string> {
    const { email, password } = login;
    const emailValidate = new Email(email).value;
    const passwordValidate = new Password(password).value;
    const user = await this.user.findOneLogin(login);

    if (!bcrypt.compareSync(passwordValidate, user.password)) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const token = generateToken(emailValidate);
    return token;
  }

  public async getUser(email: string | JwtPayload): Promise<IUser> {
    const userRole = await this.user.findOneValidate(email);
    return userRole;
  }
}

export default UserServices;
