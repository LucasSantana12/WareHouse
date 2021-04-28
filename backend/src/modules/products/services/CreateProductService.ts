import Product from '@modules/products/infra/typeorm/entities/Product';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoryRepository';
import ICategoryRepository from '@modules/categories/repositories/ICategoriesRepositories';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepositories';
import IProductRepository from '../repositories/IProductsRepositories';

interface IRequest {
  id?: string;
  title: string;
  description: string;
  quantity: number;
  category: string;
}

class CreateProductService {
  constructor(
    private productsRepository: IProductRepository,
    private categoriesRepository: ICategoryRepository,
  ) {}

  public async execute({
    title,
    description,
    quantity,
    category,
  }: IRequest): Promise<Product> {
    // Criando a categoria
    let productCategory = await this.categoriesRepository.findByTitle(category);
    if (!productCategory) {
      productCategory = await this.categoriesRepository.create({
        title: category,
      });
      await this.categoriesRepository.save(productCategory);
    }
    // -------------------------------------------//

    /**
     * Se um item com o mesmo nome for adicionado a tabela, uma nova Linha nao sera
     * criada e sim será atualizado a coluna de quantidade
     */
    const getProduct = await this.productsRepository.findByTitle(title);

    const productQuatity = getProduct?.quantity as number;

    if (getProduct) {
      getProduct.quantity = productQuatity + quantity;

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
      category: productCategory,
    });

    // ---------------------------------------//
    return product;
  }
}

export default CreateProductService;
