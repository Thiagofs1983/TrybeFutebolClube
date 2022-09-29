import { Router } from 'express'
import tokenValidation from '../middlewares/auth';
import UserController from '../controllers/user.controllers';
import TeamsControllers from '../controllers/teams.controllers';

const userController = new UserController();
const teamsController = new TeamsControllers();

const router = Router();

router.post('/login', userController.loginController);
router.get('/login/validate', tokenValidation, userController.getUser);

router.get('/teams', teamsController.getAll);

export default router;