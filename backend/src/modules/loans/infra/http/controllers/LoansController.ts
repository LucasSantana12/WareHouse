import CreateLoanService from '@modules/loans/services/CreateLoanService';
import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';
import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import Loan from '../../typeorm/entities/Loan';
import LoansRepository from '../../typeorm/repositories/LoansRepository';

export default class LoansController {
  public async show(request: Request, response: Response): Promise<Response> {
    const loansRepository = getRepository(Loan);

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(request.user.id);

    if (!user?.admin) {
      const loans = await loansRepository.find({
        where: {
          user_id: request.user.id,
        },
      });

      return response.json(loans);
    }

    const loans = await loansRepository.find({
      order: { updated_at: 'DESC' },
    });

    return response.json(loans);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { qtd, user_id, product_id } = request.body;

    const loansRepository = new LoansRepository();

    const createLoan = new CreateLoanService(loansRepository.create);

    const loan = await createLoan.execute({
      qtd,

      user_id,

      product_id,
    });

    return response.json(loan);
  }
}
