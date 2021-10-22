import UpdateProductsQuantityService from '@modules/products/services/UpdateProductsQuantityService';

import { Request, Response } from 'express';

import ProductsRepository from '../../typeorm/repositories/ProductsRepositories';

export default class ProductQuantityController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const { quantity } = request.body;

    const productsRepository = new ProductsRepository();

    const UpdateQuantity = new UpdateProductsQuantityService(
      productsRepository,
    );

    const product = await UpdateQuantity.execute({
      product_id,

      quantity,
    });

    return response.json(product);
  }
}
