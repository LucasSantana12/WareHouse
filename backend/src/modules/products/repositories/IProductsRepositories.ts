import Product from '../infra/typeorm/entities/Product';

import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductRepository {
  findById(id: string): Promise<Product | undefined>;

  findByTitle(title: string): Promise<Product | undefined>;

  create(productData: ICreateProductDTO): Promise<Product>;
}
