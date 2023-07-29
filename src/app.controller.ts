import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  UsePipes,
  Param,
  Get,
} from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly customersService: CustomersService,
    private authService: AuthService,
  ) {}

  @Get()
  hello() {
    return 'Hello World!';
  }

  @Post('reg')
  register(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.register(createCustomerDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
