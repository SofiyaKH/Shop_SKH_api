import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private repository: Repository<Customer>,
  ) {}

  async register(data: CreateCustomerDto) {
    const saltOrRounds = 10;

    data.password = await bcrypt.hash(
      data.password,
      bcrypt.genSaltSync(saltOrRounds),
    );
    return this.repository.save(data);
  }

  async auth(data: CreateCustomerDto) {
    const user = await this.repository.findOneBy({ email: data.email });
    if (!user) {
      return false;
    }

    return await bcrypt.compare(data.password, user.password);
  }

  findAll(): Promise<Customer[]> {
    return this.repository.find();
  }

  findOne(email: string) {
    return this.repository.findOneBy({ email });
  }

  update(id: number, data: UpdateCustomerDto) {
    return this.repository.save({ ...data, id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
