import { getRepository } from 'typeorm';
import Loan from '@modules/loans/infra/typeorm/entities/Loan';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/error/AppError';

interface Request {
  id: string;
  returned: boolean;
  product_id: string;
}
class ReturnedLoanService {
  public async update({ returned, product_id, id }: Request): Promise<Loan> {
    const loansRepository = getRepository(Loan);
    const productsRepository = getRepository(Product);

    /**
     * Somente o admin pode dar como devolvido o material,
     * a autenticação deverar ser feita atravez de um middleware de verificação
     * Regra de negocio
     *
     * A coluna de loan tem a coluna returned, que é poder default false,
     * é ela que vamos alterar para verdadeiro e consequentimente,
     * vamos devover a quantidade emprestada para a tabela de pradutos
     * na coluna Quantity
     */

    const getProduct = await productsRepository.findOne(product_id);

    if (!getProduct) {
      throw new AppError('Produto não encontrado!', 403);
    }

    const getLoan = await loansRepository.findOne(id);

    if (!getLoan) {
      throw new AppError('Emprestimo não encontrado!', 403);
    }

    const quantity = getProduct.quantity + getLoan.qtd;
    getProduct.quantity = quantity;

    await productsRepository.save(getProduct);
    // eslint-disable-next-line no-param-reassign

    getLoan.returned = returned;

    const loan = await loansRepository.save(getLoan);

    return loan;
  }
}
export default ReturnedLoanService;
