import { Request, Response } from 'express';
import UserServices from '../services/user.services';

class UserController {
  constructor(private user = new UserServices()) { }

  public loginController = async (req: Request, res: Response): Promise<void> => {
    const token = await this.user.loginService(req.body);
    res.status(200).json({ token });
  }
}


export default UserController;