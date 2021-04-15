import path from 'path';
import fs from 'fs';
import Product from '@modules/products/infra/typeorm/entities/Product';
import uploadConfig from '@config/upload';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepositories';

interface IRequest {
  product_id: string;
  fileName: string;
}

class UpdatedProductPictureService {
  constructor(private productsRepository: ProductsRepository) {}

  public async execute({ product_id, fileName }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new Error('Product not finded');
    }

    if (product.picture_id) {
      const productPictureFilePath = path.join(
        uploadConfig.directory,
        product.picture_id,
      );
      const productPictureExist = await fs.promises.stat(
        productPictureFilePath,
      );
      if (productPictureExist) {
        await fs.promises.unlink(productPictureFilePath);
      }
    }

    product.picture_id = fileName;

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdatedProductPictureService;
