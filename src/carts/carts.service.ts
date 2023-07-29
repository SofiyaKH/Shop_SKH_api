import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private repository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(data: CreateCartDto) {
    return this.repository.save(data);
  }

  findAll(): Promise<Cart[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Cart | null> {
    return this.repository.findOneBy({ id });
  }

  update(id: number, data: UpdateCartDto) {
    return this.repository.save({ ...data, id });
  }

  async addProduct(id: number, data: Product) {
    let cart = await this.repository.findOneBy({ id });
    cart.products.push({ ...data });
    return this.repository.save({ ...data, id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async addProductToCart(cartId: string, productId: string) {
    const cart = await this.repository.findOneBy({ id: Number(cartId) });

    const product = await this.productRepository.findOneBy({
      id: Number(productId),
    });
    if (!cart.products.some((elem) => product.id == elem.id))
      cart.price += product.price;
    cart.products.push(product);
    return this.repository.save(cart);
  }
}
