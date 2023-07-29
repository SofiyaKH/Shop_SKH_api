import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type sexTypes = 'F' | 'M' | 'U';
export type sizeTypes = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  img: string;

  @Column({
    type: 'enum',
    enum: ['F', 'M', 'U'],
    default: 'U',
  })
  sex: sexTypes;

  @Column({
    type: 'enum',
    enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    default: 'S',
  })
  size: sizeTypes;

  @Column({ nullable: true })
  color: string;

  @Column()
  price: number;
}
