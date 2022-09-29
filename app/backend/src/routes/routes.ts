import { Router } from 'express'
import tokenValidation from '../middlewares/auth';
import UserController from '../controllers/user.controllers';

const userController = new UserController();

const router = Router();

router.post('/login', userController.loginController);
router.get('/login/validate', tokenValidation, userController.getUser);

export default router;