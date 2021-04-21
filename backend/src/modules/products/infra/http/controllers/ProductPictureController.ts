import UpdatedProductPictureService from '@modules/products/services/UpdatedProductPictureService';
import { Request, Response } from 'express';
import ProductsRepository from '../../typeorm/repositories/ProductsRepositories';

export default class ProductPictureController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;
    const productsRepository = new ProductsRepository();
    const updatedPicture = new UpdatedProductPictureService(productsRepository);

    const product = await updatedPicture.execute({
      product_id,
      fileName: request.file.filename,
    });

    return response.json(product);
  }
}
