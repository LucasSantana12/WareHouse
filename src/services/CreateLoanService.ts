import { getRepository } from 'typeorm';
import Loan from '../models/Loan';
import Product from '../models/Product';

interface Request {

  qtd: number;
  user_id: string;
  product_id: string;
}
class CreateLoanService {
  public async execute({
    
    qtd,
    user_id,
    product_id,
  }: Request): Promise<Loan> {
    const loansRepository = getRepository(Loan);
    const ProductRepository = getRepository(Product);

    /**
     * Regra de negocio para a quantidade de emprestimo.
     *
     * se o cliente pedir uma quantidade maior que temos em estoque,
     * esse erro será apresentado.
     *
     * se nao, a tabela de quantidade do produtos será atualizada,
     * subitraindo o valor pedido pelo ja existente
     */
   const checkQtd = await ProductRepository.findOne({
      where:{
        id:product_id
      }
    });

    console.log(checkQtd);

    let productQuatity = checkQtd?.quantity as number

    if(!checkQtd){
      throw new Error('Produto não encotrado!')
    }
    if(productQuatity < qtd ){
        throw new Error("Não temos toda essa quantidade de estoque")
    }else{
    
      let quantity = productQuatity - qtd

       await ProductRepository.update(
        {id:product_id},
        {quantity}
        );}
      
  //----------------------------------------------------//

  //Criando e salvando o emprestimo
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
