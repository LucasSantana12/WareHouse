import { getRepository } from 'typeorm';
import Category from '../models/Category';
import Product from '../models/Product';

interface Request {
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
  }: Request): Promise<Product> {
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
    const checkQtd = await productsRepository.findOne({
      where: {
        title,
      },
    });

    const productQuatity = checkQtd?.quantity as number;

    if (checkQtd) {
      const value = productQuatity + quantity;

      await productsRepository.update({ title }, { quantity: value });
      const product = await productsRepository.findOne({
        where: {
          title,
        },
      });

      return product as Product;
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
