import { getRepository } from 'typeorm';
import AppError from '../../../shared/error/AppError';
import Product from '../entities/Product';

interface Request {
  product_id: string;
  quantity: number;
}
class UpdateProductsQuantityService {
  public async execute({ product_id, quantity }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const getProduct = await productsRepository.findOne(product_id);

    if (!getProduct) {
      throw new AppError('Não foi possivel encontrar o produto', 403);
    }

    getProduct.quantity = quantity;

    const product = await productsRepository.save(getProduct);

    return product;
  }
}

export default UpdateProductsQuantityService;
