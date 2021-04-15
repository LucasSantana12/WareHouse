import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('loans')
class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tomb: number;

  @Column()
  qtd: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  costumer: User;

  @Column()
  user_id: string;

  @Column()
  returned: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Loan;
