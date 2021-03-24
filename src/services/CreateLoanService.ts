import { getRepository } from 'typeorm';
import Loan from '../models/Loan';
import Product from '../models/Product';

interface Request {
  tomb: number;
  qtd: number;
  user_id: string;
  product_id: string;
}
class CreateLoanService {
  public async execute({
    tomb,
    qtd,
    user_id,
    product_id,
  }: Request): Promise<Loan> {
    const loansRepository = getRepository(Loan);
    const ProductRepository = getRepository(Product);

   const checkQtd = await ProductRepository.findOne({
      where:{
        id:product_id
      }
    })
    let productQuatity = checkQtd?.quantity
    if(productQuatity! < qtd ){
        throw new Error("Não temos toda essa quantidade de estoque")
    }
    else {
      let value = productQuatity! - qtd

      let productQtd = await ProductRepository.update(
        {id:product_id},
        {quantity: value}
        );

      }
    const loan = loansRepository.create({
      tomb,
      qtd,
      user_id,
      product_id,
    });

    await loansRepository.save(loan);

    return loan;

  }
}
  export default CreateLoanService;
