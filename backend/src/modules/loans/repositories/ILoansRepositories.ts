import Loan from '../infra/typeorm/entities/Loan';

import ICreateLoanDTO from '../dtos/ICreateLoanDTO';

export default interface ILoanRepository {
  findById(id: string): Promise<Loan | undefined>;

  create(data: ICreateLoanDTO): Promise<Loan>;

  save(loan: Loan): Promise<Loan>;
}
