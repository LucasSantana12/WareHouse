import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateLoanService from '../services/CreateLoanService';
import ReturnedLoanService from '../services/ReturnedLoanService';
import Loan from '../models/Loan';
import ensureAutheticated from '../middlewares/ensureAutheticated';
import ensureAdminAutheticated from '../middlewares/ensureAdminAutheticated';
import PutTombOnLoanService from '../services/PutTombOnLoanService';

const loansRouter = Router();

loansRouter.get('/', ensureAutheticated, async (request, response) => {
  console.log(request.user);

  const loansRepository = getRepository(Loan);
  const loans = await loansRepository.findOne({
    where: {
      user_id: request.user.id,
    },
  });
  console.log(loans);

  return response.json(loans);
});

loansRouter.post('/', ensureAutheticated, async (request, response) => {
  const { qtd, user_id, product_id } = request.body;

  const createLoan = new CreateLoanService();

  const loan = await createLoan.execute({
    qtd,
    user_id,
    product_id,
  });

  return response.json(loan);
});

loansRouter.patch(
  '/returned/:id',
  ensureAdminAutheticated,
  async (request, response) => {
    const { returned, product_id } = request.body;
    const { id } = request.params;

    const returnedService = new ReturnedLoanService();

    const loan = await returnedService.update({
      id,
      returned,
      product_id,
    });
    return response.json(loan);
  },
);

loansRouter.patch(
  '/tomb',
  ensureAdminAutheticated,
  async (request, response) => {
    const { Loan_id, tomb } = request.body;

    const tombLoan = new PutTombOnLoanService();

    const loan = await tombLoan.exceute({
      Loan_id,
      tomb,
    });

    return response.json(loan);
  },
);

export default loansRouter;
