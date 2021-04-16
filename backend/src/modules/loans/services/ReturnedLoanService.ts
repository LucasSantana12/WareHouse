import Loan from '@modules/loans/infra/typeorm/entities/Loan';
import AppError from '@shared/error/AppError';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepositories';
import LoanRepository from '../infra/typeorm/repositories/LoanRepositories';

interface IRequest {
  id: string;
  returned: boolean;
  product_id: string;
}
class ReturnedLoanService {
  constructor(
    private loansRepository: LoanRepository,
    private productsRepository: ProductsRepository,
  ) {}

  public async update({ returned, product_id, id }: IRequest): Promise<Loan> {
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

    const getProduct = await this.productsRepository.findById(product_id);

    if (!getProduct) {
      throw new AppError('Produto não encontrado!', 403);
    }

    const getLoan = await this.loansRepository.findById(id);

    if (!getLoan) {
      throw new AppError('Emprestimo não encontrado!', 403);
    }
    if (getLoan.returned) {
      return getLoan;
    }

    const quantity = getProduct.quantity + getLoan.qtd;
    getProduct.quantity = quantity;

    await this.productsRepository.save(getProduct);
    // eslint-disable-next-line no-param-reassign

    getLoan.returned = returned;

    const loan = await this.loansRepository.save(getLoan);

    return loan;
  }
}
export default ReturnedLoanService;
