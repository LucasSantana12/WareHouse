import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Product from '@modules/products/infra/typeorm/entities/Product';
import uploadConfig from '@config/upload';

interface Request {
  product_id: string;
  fileName: string;
}

class UpdatedProductPictureService {
  public async execute({ product_id, fileName }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);
    const product = await productsRepository.findOne(product_id);
    console.log(product);

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

    await productsRepository.save(product);

    return product;
  }
}

export default UpdatedProductPictureService;
