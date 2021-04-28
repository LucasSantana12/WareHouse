import ICategoryRepository from '@modules/categories/repositories/ICategoriesRepositories';

import Category from '@modules/categories/infra/typeorm/entities/Category';

import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoriesDTO';
import { uuid } from 'uuidv4';

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[] = [];

  public async findByTitle(title: string): Promise<Category | undefined> {
    const findCategory = this.categories.find(
      category => category.title === title,
    );

    return findCategory;
  }

  public async create({ title }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      id: uuid(),
      title,
    });

    return category;
  }

  public async save(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(
      findCategory => findCategory.id,
    );

    this.categories[findIndex] = category;

    return category;
  }
}

export default CategoriesRepository;
