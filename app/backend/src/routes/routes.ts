import { Router } from 'express'
import UserController from '../controllers/user.controllers';

const userController = new UserController();

const router = Router();

router.post('/login', userController.loginController);

export default router;