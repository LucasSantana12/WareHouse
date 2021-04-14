import { getRepository, Repository } from 'typeorm';

import IProductRepository from '@modules/products/repositories/IProductsRepositories';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import Loan from '@modules/loans/infra/typeorm/entities/Loan';

class ProductsRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const loan = await this.ormRepository.findOne(id);

    return loan;
  }

  public async findByTitle(title: string): Promise<Product | undefined> {
    const loan = await this.ormRepository.findOne({
      where: { title },
    });
    return loan;
  }

  public async create(loanData: ICreateProductDTO): Promise<Loan> {
    const loan = this.ormRepository.create(loanData);

    await this.ormRepository.save(loan);
    return loan;
  }

  public async save(loan: Loan): Promise<Loan> {
    return this.ormRepository.save(loan);
  }
}

export default ProductsRepository;
