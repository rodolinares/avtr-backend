import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'

import { AddProductDto } from './dto/add-product.dto'
import { CartService } from './cart.service'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addProduct(@Body() body: AddProductDto) {
    return this.cartService.addProduct(body.user, body.product, body.amount || 1)
  }

  @Get(':user')
  async getCart(@Param('user') user: string) {
    return this.cartService.getCart(user)
  }

  @Delete(':user/item/:item')
  async removeProduct(@Param('user') user: string, @Param('item') item: string) {
    return this.cartService.removeProduct(user, item)
  }
}
