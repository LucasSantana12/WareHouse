import { getRepository } from 'typeorm';
import Loan from '../models/Loan';
import Product from '../models/Product';
import AppError from '../error/AppError';

interface Request {
  qtd: number;
  user_id: string;
  product_id: string;
}
class CreateLoanService {
  public async execute({ qtd, user_id, product_id }: Request): Promise<Loan> {
    const productsRepository = getRepository(Product);
    const loansRepository = getRepository(Loan);

    /**
     * Regra de negocio para a quantidade de emprestimo.
     *
     * se o cliente pedir uma quantidade maior que temos em estoque,
     * esse erro será apresentado.
     *
     * se nao, a tabela de quantidade do produtos será atualizada,
     * subitraindo o valor pedido pelo ja existente
     */
    const checkQtd = await productsRepository.findOne(product_id);

    const productQuatity = checkQtd?.quantity as number;

    if (!checkQtd) {
      throw new AppError('Produto não encotrado!', 401);
    }
    if (productQuatity < qtd) {
      throw new AppError('Não temos toda essa quantidade de estoque', 403);
    } else {
      const quantity = productQuatity - qtd;

      await productsRepository.update({ id: product_id }, { quantity });
    }

    // ----------------------------------------------------//

    // Criando e salvando o emprestimo
    const loan = loansRepository.create({
      qtd,
      user_id,
      product_id,
    });

    await loansRepository.save(loan);

    return loan;
  }
}
export default CreateLoanService;
