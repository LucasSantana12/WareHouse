import { request } from 'express';
import { getRepository } from 'typeorm';
import Loan from '../models/Loan';
import Product from '../models/Product';

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

    const getProduct = await productsRepository.findOne({
      where: {
        id: product_id,
      },
    });

    if (!getProduct) {
      throw new Error('Produto não encontrado!');
    }

    const getLoan = await loansRepository.findOne({
      where: {
        id,
      },
    });

    if (!getLoan) {
      throw new Error('Emprestimo não encontrado!');
    }

    const quantity = getProduct.quantity + getLoan.qtd;

    await productsRepository.update({ id: product_id }, { quantity });
    returned = true;
    const loan = await loansRepository.update({ id }, { returned });

    return ({
      loan,
    } as unknown) as Loan;
  }
}
export default ReturnedLoanService;
