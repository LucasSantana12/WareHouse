import IProductRepository from '@modules/products/repositories/IProductsRepositories';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '../../infra/typeorm/entities/Product';

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
      id: '1',
      title,
      description,
      quantity,
      category,
    });

    this.Products.push(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.Products.findIndex(
      findUProduct => findUProduct.id === product.id,
    );

    this.Products[findIndex] = product;

    return product;
  }
}

export default FakeProductRepository;
