import { getRepository } from 'typeorm';
import AppError from '../error/AppError';
import Loan from '../models/Loan';

interface Request {
  Loan_id: string;
  tomb: number;
}

class PutTombOnLoanService {
  public async exceute({ Loan_id, tomb }: Request): Promise<Loan> {
    const loansRepository = getRepository(Loan);

    const loan = await loansRepository.findOne(Loan_id);

    if (!loan) {
      throw new AppError('Emprestimo nao encotrado', 403);
    }

    loan.tomb = tomb;

    await loansRepository.save(loan);

    return loan;
  }
}

export default PutTombOnLoanService;
