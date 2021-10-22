import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductsRepositories';

interface IRequest {
  id?: string;
  title: string;
  description: string;
  quantity: number;
  category: string;
}

class CreateProductService {
  constructor(private productsRepository: IProductRepository) {}

  public async execute({
    title,
    description,
    quantity,
    category,
  }: IRequest): Promise<Product> {
    /**
     * Se um item com o mesmo nome for adicionado a tabela, uma nova Linha nao sera
     * criada e sim será atualizado a coluna de quantidade
     */
    const getProduct = await this.productsRepository.findByTitle(title);

    const productQuatity = getProduct?.quantity as number;

    if (getProduct) {
      getProduct.quantity = (productQuatity + quantity) as number;

      const product = await this.productsRepository.save(getProduct);

      return product;
    }
    // --------------------------------------------------//

    /**
     * Criando o produto e salvando
     */
    const product = await this.productsRepository.create({
      title,
      description,
      quantity,
      category,
    });

    // ---------------------------------------//
    return product;
  }
}

export default CreateProductService;
