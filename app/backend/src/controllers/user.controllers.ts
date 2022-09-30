import { Request, Response } from 'express';
import * as Jwt from 'jsonwebtoken';
import { IRequest } from '../interfaces';
import UserServices from '../services/user.services';

class UserController {
  constructor(private user = new UserServices()) { }

  public loginController = async (req: Request, res: Response): Promise<void> => {
    const token = await this.user.loginService(req.body);
    res.status(200).json({ token });
  };

  public getUser = async (req: IRequest, res: Response): Promise<void> => {
    const email = req.email as Jwt.JwtPayload;

    if (email.payload) {
      const { role } = await this.user.getUser(email.payload);
      res.status(200).json({ role });
    }
  };
}

export default UserController;
