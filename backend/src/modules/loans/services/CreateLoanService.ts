import { inject, injectable } from 'tsyringe';

import Loan from '@modules/loans/infra/typeorm/entities/Loan';

import AppError from '@shared/error/AppError';

import IProductRepository from '@modules/products/repositories/IProductsRepositories';

import ILoanRepository from '../repositories/ILoansRepositories';

interface IRequest {
  qtd: number;

  user_id: string;

  product_id: string;
}

@injectable()
class CreateLoanService {
  constructor(
    @inject('LoanRepositiory')
    private loansRepository: ILoanRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({ qtd, user_id, product_id }: IRequest): Promise<Loan> {
    /**



     * Regra de negocio para a quantidade de emprestimo.



     *



     * se o cliente pedir uma quantidade maior que temos em estoque,



     * esse erro será apresentado.



     *



     * se nao, a tabela de quantidade do produtos será atualizada,



     * subitraindo o valor pedido pelo ja existente



     */

    const getProduct = await this.productsRepository.findById(product_id);

    const productQuatity = getProduct?.quantity as number;

    if (!getProduct) {
      throw new AppError('Produto não encotrado!', 401);
    }

    if (productQuatity < qtd) {
      throw new AppError('Não temos toda essa quantidade de estoque', 403);
    }

    getProduct.quantity = productQuatity - qtd;

    await this.productsRepository.save(getProduct);

    // ----------------------------------------------------//

    // Criando e salvando o emprestimo

    const loan = await this.loansRepository.create({
      qtd,

      user_id,

      product_id,
    });

    return loan;
  }
}

export default CreateLoanService;
