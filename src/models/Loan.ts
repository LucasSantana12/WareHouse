import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Product from './Product';
import User from './User';

@Entity('loans')
class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tomb: number;
  @Column()
  qtd: number;

  @ManyToOne(()=> Product)
  @JoinColumn({ name: 'product_id'})
  product: Product

  @Column()
  product_id: string;

  @ManyToOne(()=> User)
  @JoinColumn({ name: 'user_id'})
  costumer: User

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Loan;
