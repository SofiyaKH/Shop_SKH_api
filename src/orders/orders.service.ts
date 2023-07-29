import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
  ) {}

  create(data: CreateOrderDto) {
    return this.repository.save(data);
  }

  findAll(): Promise<Order[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Order | null> {
    return this.repository.findOneBy({ id });
  }
  
  update(id: number, data: UpdateOrderDto) {
    return this.repository.save({ ...data, id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
