import { JwtPayload } from 'jsonwebtoken';
import { Ilogin } from '../interfaces';
import User from '../database/models/user';
import CustomError from '../errors/custom.erros';

class UserModel {
  constructor(private user = User) { }

  public async findOneLogin(login: Ilogin): Promise<User> {
    const { email } = login;
    const user = await this.user.findOne({ where: { email } });
    if (!user) throw new CustomError(401, 'Incorrect email or password');
    return user;
  }

  public async findOneValidate(email: string | JwtPayload): Promise<User> {
    const userRole = await this.user.findOne({ where: { email } });
    if (!userRole) throw new CustomError(401, 'User not found');
    return userRole;
  }
}

export default UserModel;
