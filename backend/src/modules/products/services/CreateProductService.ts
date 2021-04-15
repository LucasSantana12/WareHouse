import { getRepository } from 'typeorm';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  title: string;
  description: string;
  quantity: number;
  category: string;
}

class CreateProductService {
  public async execute({
    title,
    description,
    quantity,
    category,
  }: IRequest): Promise<Product> {
    const productsRepository = getRepository(Product);
    const categoryRepository = getRepository(Category);

    // Criando a categoria
    let productCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });
    if (!productCategory) {
      productCategory = categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(productCategory);
    }
    // -------------------------------------------//

    /**
     * Se um item com o mesmo nome for adicionado a tabela, uma nova Linha nao sera
     * criada e sim será atualizado a coluna de quantidade
     */
    const getProduct = await productsRepository.findOne({
      where: {
        title,
      },
    });

    const productQuatity = getProduct?.quantity as number;

    if (getProduct) {
      getProduct.quantity = productQuatity + quantity;

      const product = await productsRepository.save(getProduct);

      return product;
    }
    // --------------------------------------------------//

    /**
     * Criando o produto e salvando
     */
    const product = productsRepository.create({
      title,
      description,
      quantity,
      category: productCategory,
    });

    await productsRepository.save(product);

    // ---------------------------------------//
    return product;
  }
}

export default CreateProductService;
