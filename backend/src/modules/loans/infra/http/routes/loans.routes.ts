import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateLoanService from '@modules/loans/services/CreateLoanService';
import ReturnedLoanService from '@modules/loans/services/ReturnedLoanService';
import Loan from '@modules/loans/infra/typeorm/entities/Loan';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import ensureAdminAutheticated from '@modules/users/infra/http/middlewares/ensureAdminAutheticated';
import PutTombOnLoanService from '@modules/loans/services/PutTombOnLoanService';
import LoanRepositories from '@modules/loans/infra/typeorm/repositories/LoanRepositories';

const loansRouter = Router();

loansRouter.get('/', ensureAutheticated, async (request, response) => {
  const loansRepository = getRepository(Loan);
  const loans = await loansRepository.findOne({
    where: {
      user_id: request.user.id,
    },
  });

  return response.json(loans);
});

loansRouter.post('/create', ensureAutheticated, async (request, response) => {
  const { qtd, user_id, product_id } = request.body;
  const loansRepository = new LoanRepositories();

  const createLoan = new CreateLoanService(loansRepository);

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
    const loansRepository = new LoanRepositories();

    const returnedService = new ReturnedLoanService(loansRepository);

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
    const loansRepository = new LoanRepositories();

    const tombLoan = new PutTombOnLoanService(loansRepository);

    const loan = await tombLoan.execute({
      Loan_id,
      tomb,
    });

    return response.json(loan);
  },
);

export default loansRouter;
