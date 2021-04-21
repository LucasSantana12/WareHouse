import AppError from '@shared/error/AppError';

import Loan from '@modules/loans/infra/typeorm/entities/Loan';

import LoanRepository from '../infra/typeorm/repositories/LoansRepository';

interface IRequest {
  Loan_id: string;

  tomb: number;
}

class PutTombOnLoanService {
  constructor(private loansRepository: LoanRepository) {}

  public async execute({ Loan_id, tomb }: IRequest): Promise<Loan> {
    const loan = await this.loansRepository.findById(Loan_id);

    if (!loan) {
      throw new AppError('Emprestimo nao encotrado', 403);
    }

    loan.tomb = tomb;

    await this.loansRepository.save(loan);

    return loan;
  }
}

export default PutTombOnLoanService;
