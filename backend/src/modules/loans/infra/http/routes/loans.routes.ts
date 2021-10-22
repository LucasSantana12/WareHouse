import { Router } from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import ensureAdminAutheticated from '@modules/users/infra/http/middlewares/ensureAdminAutheticated';
import LoansController from '../controllers/LoansController';
import LoanReturnedController from '../controllers/LoanReturnedController';
import LoanTombController from '../controllers/LoanTombController';

const loansRouter = Router();

const loansController = new LoansController();
const loanReturnedController = new LoanReturnedController();
const loanTombController = new LoanTombController();

loansRouter.get('/', ensureAutheticated, loansController.show);

loansRouter.post('/create', ensureAutheticated, loansController.create);

loansRouter.patch(
  '/returned/:id',

  ensureAdminAutheticated,

  loanReturnedController.update,
);

loansRouter.patch('/tomb', ensureAdminAutheticated, loanTombController.update);

export default loansRouter;
