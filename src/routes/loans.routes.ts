import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateLoanService from '../services/CreateLoanService';
import Loan from '../models/Loan';
import ensureAutheticated from '../middlewares/ensureAutheticated'
const loansRouter = Router();

loansRouter.use(ensureAutheticated)

loansRouter.get('/', async (request, response) => {
  console.log(request.user)
  const loansRepository = getRepository(Loan);
  const loans = await loansRepository.find();

  return response.json(loans);
});

loansRouter.post('/', async (request, response) => {
  try {
    const { tomb, qtd, user_id, product_id } = request.body;

    const createLoan = new CreateLoanService();

    const loan = await createLoan.execute({
      tomb,
      qtd,
      user_id,
      product_id
    });

    return response.json(loan);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default loansRouter;
