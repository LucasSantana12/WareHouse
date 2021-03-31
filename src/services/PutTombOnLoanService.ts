import { getRepository } from 'typeorm';
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
      throw new Error('Emprestimo nao encotrado');
    }

    loan.tomb = tomb;

    await loansRepository.save(loan);

    return loan;
  }
}

export default PutTombOnLoanService;
