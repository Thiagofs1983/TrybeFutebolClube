import { Router } from 'express'
import tokenValidation from '../middlewares/auth';
import UserController from '../controllers/user.controllers';
import TeamsControllers from '../controllers/teams.controllers';
import MatchesControllers from '../controllers/matches.controllers';

const userController = new UserController();
const teamsController = new TeamsControllers();
const matchesController = new MatchesControllers();

const router = Router();

router.post('/login', userController.loginController);
router.get('/login/validate', tokenValidation, userController.getUser);

router.get('/teams', teamsController.getAll);
router.get('/teams/:id', teamsController.getById);

router.get('/matches', matchesController.matchesInProgress);
router.post('/matches', tokenValidation, matchesController.createNewMatche);
router.patch('/matches/:id/finish', matchesController.updateInProgress);

export default router;