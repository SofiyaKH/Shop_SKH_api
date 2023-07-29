import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    cascade: true,
  })
  customer: Customer;

  @ManyToMany(() => Product, {
    cascade: true,
    eager: true 
  })
  @JoinTable()
  products: Product[];

  @Column({ default: 0 })
  order_price: number;
}
