import { getRepository } from 'typeorm';
import Loan from '@modules/loans/infra/typeorm/entities/Loan';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/error/AppError';
import LoanRepository from '../infra/typeorm/repositories/LoanRepositories';

interface IRequest {
  qtd: number;
  user_id: string;
  product_id: string;
}
class CreateLoanService {
  constructor(private loansRepository: LoanRepository) {}

  public async execute({ qtd, user_id, product_id }: IRequest): Promise<Loan> {
    const productsRepository = getRepository(Product);
    /**
     * Regra de negocio para a quantidade de emprestimo.
     *
     * se o cliente pedir uma quantidade maior que temos em estoque,
     * esse erro será apresentado.
     *
     * se nao, a tabela de quantidade do produtos será atualizada,
     * subitraindo o valor pedido pelo ja existente
     */
    const getProduct = await productsRepository.findOne(product_id);

    const productQuatity = getProduct?.quantity as number;

    if (!getProduct) {
      throw new AppError('Produto não encotrado!', 401);
    }
    if (productQuatity < qtd) {
      throw new AppError('Não temos toda essa quantidade de estoque', 403);
    } else {
      getProduct.quantity = productQuatity - qtd;
      await productsRepository.save(getProduct);
    }

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
