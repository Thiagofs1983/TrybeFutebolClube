import { JwtPayload } from 'jsonwebtoken';
import { Ilogin } from '../interfaces';
import User from '../database/models/user';
import HttpValidateError from '../errors/validation.erros';

class UserModel {
  private user = User;

  public async findOneLogin(login: Ilogin) {
    const { email } = login;
    const user = await this.user.findOne({ where: { email } });
    if (!user) throw new HttpValidateError(401, 'Incorrect email or password');
    return user;
  }

  public async findOneValidate(email: string | JwtPayload) {
    const userRole = await this.user.findOne({ where: { email } });
    if (!userRole) throw new HttpValidateError(401, 'User not found');
    return userRole;
  }
}

export default UserModel;
