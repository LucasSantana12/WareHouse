import { container } from 'tsyringe';

import ILoanRepository from '@modules/loans/repositories/ILoansRepositories';
import LoanRepositiory from '@modules/loans/infra/typeorm/repositories/LoansRepository';

container.registerSingleton<ILoanRepository>(
  'LoanRepositiory',
  LoanRepositiory,
);
