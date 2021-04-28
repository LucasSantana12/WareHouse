import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import FakeCategoryRepository from '@modules/categories/repositories/fakes/FakeCategoryRepository';
import FakeLoanRepository from '../repositories/fakes/FakeLoansRepository';
import CreateLoanService from './CreateLoanService';

describe('CreateLoan', () => {
  it('shoud be able to create a new loan', async () => {
    const fakeLoanRepository = new FakeLoanRepository();
    const fakeProductRepository = new FakeProductRepository();
    const fakeCategoryRepository = new FakeCategoryRepository();
    const createLoan = new CreateLoanService(
      fakeLoanRepository,
      fakeProductRepository,
    );
    const createProduct = new CreateProductService(
      fakeProductRepository,
      fakeCategoryRepository,
    );
    const product = await createProduct.execute({
      title: 'minecraft',
      category: 'jogo',
      description: 'jogo de bloco',
      quantity: 25,
    });
    expect(product).toHaveProperty('id');

    const loan = await createLoan.execute({
      product_id: '1',
      qtd: 12,
      user_id: '534544545',
    });

    expect(loan).toHaveProperty('qtd');
  });
});
