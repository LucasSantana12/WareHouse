import { getRepository, Repository } from 'typeorm';

import ICategoryRepository from '@modules/categories/repositories/ICategoriesRepositories';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoriesDTO';

class CategoriesRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findByTitle(title: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return category;
  }

  public async create(categoryData: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(categoryData);

    await this.ormRepository.save(category);
    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }
}

export default CategoriesRepository;
