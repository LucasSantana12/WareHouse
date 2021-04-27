import IProductRepository from '@modules/products/repositories/IProductsRepositories';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import { uuid } from 'uuidv4';
import Product from '../../entities/Product';

class FakeProductRepository implements IProductRepository {
  private Products: Product[] = [];

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.Products.find(product => product.id === id);

    return findProduct;
  }

  public async findByTitle(title: string): Promise<Product | undefined> {
    const findProduct = this.Products.find(product => product.title === title);

    return findProduct;
  }

  public async create({
    title,
    description,
    quantity,
    category,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();
    Object.assign(product, {
      id: uuid(),
      title,
      description,
      quantity,
      category,
    });

    this.Products.push(product);

    return product;
  }
}

export default FakeProductRepository;
