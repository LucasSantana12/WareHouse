import ILoanRepository from '@modules/loans/repositories/ILoansRepositories';
import ICreateLoanDTO from '@modules/loans/dtos/ICreateLoanDTO';
import Loan from '@modules/loans/infra/typeorm/entities/Loan';
import { uuid } from 'uuidv4';

class FakeLoanRepository implements ILoanRepository {
  private Loans: Loan[] = [];

  public async findById(id: string): Promise<Loan | undefined> {
    const findLoan = this.Loans.find(loan => loan.id === id);

    return findLoan;
  }

  public async create({
    qtd,
    tomb,
    user_id,
    product_id,
    returned,
  }: ICreateLoanDTO): Promise<Loan> {
    const loan = new Loan();
    Object.assign(loan, {
      id: uuid(),
      qtd,
      tomb,
      user_id,
      product_id,
      returned,
    });

    this.Loans.push(loan);

    return loan;
  }
}

export default FakeLoanRepository;
