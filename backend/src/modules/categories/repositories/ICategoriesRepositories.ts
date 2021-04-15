import Category from '../infra/typeorm/entities/Category';

import ICreateCategoryDTO from '../dtos/ICreateCategoriesDTO';

export default interface ICategoryRepository {
  findByTitle(title: string): Promise<Category | undefined>;

  create(categoryData: ICreateCategoryDTO): Promise<Category>;

  save(category: Category): Promise<Category>;
}
