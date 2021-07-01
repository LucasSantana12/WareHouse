import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface ICreateProductDTO {
  title: string;

  description: string;

  quantity: number;

  category?: Category;
}
