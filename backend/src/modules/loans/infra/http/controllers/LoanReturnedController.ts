import { Request, Response } from 'express';
import ReturnedLoanService from '@modules/loans/services/ReturnedLoanService';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepositories';
import LoanRepository from '../../typeorm/repositories/LoansRepository';

export default class LoanReturnedController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { returned, product_id } = request.body;

    const { id } = request.params;

    const loansRepository = new LoanRepository();

    const productsRepository = new ProductsRepository();

    const returnedService = new ReturnedLoanService(
      loansRepository,
      productsRepository,
    );

    const loan = await returnedService.update({
      id,
      returned,
      product_id,
    });

    return response.json(loan);
  }
}
