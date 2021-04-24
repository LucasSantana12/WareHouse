import { getRepository, Repository } from 'typeorm';
import ILoanRepository from '@modules/loans/repositories/ILoansRepositories';
import ICreateLoanDTO from '@modules/loans/dtos/ICreateLoanDTO';
import Loan from '@modules/loans/infra/typeorm/entities/Loan';

class LoanRepository implements ILoanRepository {
  private ormRepository: Repository<Loan>;

  constructor() {
    this.ormRepository = getRepository(Loan);
  }

  public async findById(id: string): Promise<Loan | undefined> {
    const loan = await this.ormRepository.findOne(id);

    return loan;
  }

  public async create(loanData: ICreateLoanDTO): Promise<Loan> {
    const loan = this.ormRepository.create(loanData);

    await this.ormRepository.save(loan);

    return loan;
  }

  public async save(loan: Loan): Promise<Loan> {
    return this.ormRepository.save(loan);
  }

  public async update(loan: Loan): Promise<Loan> {
    throw new Error('Method not implemented.');
  }
}

export default LoanRepository;
