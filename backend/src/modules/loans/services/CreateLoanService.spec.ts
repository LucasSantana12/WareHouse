import FakeProductRepository from '@modules/products/infra/typeorm/repositories/fakes/FakeProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepositories';
import FakeLoanRepository from '../repositories/fakes/FakeLoansRepository';
import CreateLoanService from './CreateLoanService';

describe('CreateLoan', () => {
  it('shoud be able to create a new loan', async () => {
    const fakeLoanRepository = new FakeLoanRepository();
    const productRepository = new FakeProductRepository();
    const createLoan = new CreateLoanService(
      fakeLoanRepository,
      productRepository,
    );

    const loan = await createLoan.execute({
      product_id: '',
      qtd: 12,
      user_id: '534544545',
    });

    expect(loan).toHaveProperty('qtd');
  });
});
