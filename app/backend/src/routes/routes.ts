import { Router } from 'express';
import tokenValidation from '../middlewares/auth';
import UserController from '../controllers/user.controllers';
import TeamsControllers from '../controllers/teams.controllers';
import MatchesControllers from '../controllers/matches.controllers';
import LeaderboardControllers from '../controllers/leaderboard.controllers';

const userController = new UserController();
const teamsController = new TeamsControllers();
const matchesController = new MatchesControllers();
const leaderboardsController = new LeaderboardControllers();

const router = Router();

router.post('/login', userController.loginController);
router.get('/login/validate', tokenValidation, userController.getUser);

router.get('/teams', teamsController.getAll);
router.get('/teams/:id', teamsController.getById);

router.get('/matches', matchesController.matchesInProgress);
router.post('/matches', tokenValidation, matchesController.createNewMatche);
router.patch('/matches/:id/finish', matchesController.updateInProgress);
router.patch('/matches/:id', matchesController.updateMaches);

router.get('/leaderboard/home', leaderboardsController.leaderboardHome);
router.get('/leaderboard/away', leaderboardsController.leaderboardAway);
router.get('/leaderboard', leaderboardsController.leaderboard);

export default router;
