import { container } from 'tsyringe';

import ILoanRepository from '@modules/loans/repositories/ILoansRepositories';
import LoanRepositiory from '@modules/loans/infra/typeorm/repositories/LoansRepository';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';
import IProductRepository from '@modules/products/repositories/IProductsRepositories';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepositories';

container.registerSingleton<ILoanRepository>(
  'LoanRepositiory',
  LoanRepositiory,
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IProductRepository>(
  'ProductsRepository',
  ProductsRepository,
);
