import { Controller, Get, Param, Query } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductResponse } from './interfaces/product-response.interface'
import { ProductExtended } from './interfaces/product.interface'

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async listProducts(
    @Query('limit') limit?: string,
    @Query('skip') skip?: string
  ): Promise<ProductResponse> {
    return this.productsService.listProducts(
      limit ? parseInt(limit) : 30,
      skip ? parseInt(skip) : 0
    )
  }

  @Get(':id')
  async retrieveProduct(@Param('id') id: string): Promise<ProductExtended> {
    return this.productsService.retrieveProduct(parseInt(id))
  }
}
