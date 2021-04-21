import PutTombOnLoanService from '@modules/loans/services/PutTombOnLoanService';
import { Request, Response } from 'express';
import LoanRepository from '../../typeorm/repositories/LoansRepository';

export default class LoanTombController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { Loan_id, tomb } = request.body;
    const loansRepository = new LoanRepository();
    const tombLoan = new PutTombOnLoanService(loansRepository);

    const loan = await tombLoan.execute({
      Loan_id,
      tomb,
    });

    return response.json(loan);
  }
}
