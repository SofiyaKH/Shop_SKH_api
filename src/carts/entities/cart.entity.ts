import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Customer, (customer) => customer.cart)
  @JoinColumn()
  customer: Customer;

  @ManyToMany(() => Product, {
    eager: true,
  })
  @JoinTable()
  products: Product[];


  @Column({ default: 0 })
  price: number;
}
