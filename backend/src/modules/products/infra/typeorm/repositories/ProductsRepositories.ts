import { getRepository, Repository } from 'typeorm';

import IProductRepository from '@modules/products/repositories/IProductsRepositories';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findByTitle(title: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { title },
    });
    return product;
  }

  public async create({
    title,
    description,
    quantity,
    category,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      title,
      description,
      quantity,
      category,
    });

    await this.ormRepository.save(product);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
