import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm'
import Product from '../models/Product';



@EntityRepository(Product)
class ProductRepository extends Repository<Product> {



}

export default ProductRepository;
