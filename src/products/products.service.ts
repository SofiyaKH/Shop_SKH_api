import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  create(data: CreateProductDto) {
    return this.repository.save(data);
  }

  findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.repository.findOneBy({ id });
  }
  
  update(id: number, data: UpdateProductDto) {
    return this.repository.save({ ...data, id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
