import AppError from '@shared/error/AppError';

import productsRouter from '../infra/http/routes/products.routes';

import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

import UpdateProductService from './UpdateProductService';

let fakeProductsRepository: FakeProductsRepository;

let updateProducts: UpdateProductService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    updateProducts = new UpdateProductService(fakeProductsRepository);
  });

  it('should be able update the profile', async () => {
    const products = await fakeProductsRepository.create({
      title: 'Notebook',

      description: '2GB RAM',
      category: 'informática',
      quantity: 12,
    });

    const updateProduct = await updateProducts.execute({
      products_id: products.id,

      description: '3GB RAM',
      category: 'informática',

      quantity: 1,
    });

    expect(updateProduct.description).toBe('3GB RAM');

    expect(updateProduct.quantity).toBe(1);
  });
});
