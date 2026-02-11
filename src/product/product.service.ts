import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

import { ProductResponse } from './interfaces/product-response.interface'
import { ProductExtended, Product } from './interfaces/product.interface'

@Injectable()
export class ProductService {
  constructor(private http: HttpService) {}

  private calcDiscountedPrice(price: number, discountPercentage: number) {
    return parseFloat((price * (1 - discountPercentage / 100)).toFixed(2))
  }

  async listProducts(limit: number, skip: number): Promise<ProductResponse> {
    const response = await firstValueFrom(
      this.http.get<ProductResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    )

    const productsWithTotal: ProductExtended[] = response.data.products.map(product => ({
      ...product,
      discountedPrice: this.calcDiscountedPrice(product.price, product.discountPercentage)
    }))

    return {
      products: productsWithTotal,
      total: response.data.total,
      skip: response.data.skip,
      limit: response.data.limit
    }
  }

  async retrieveProduct(id: number): Promise<ProductExtended> {
    const response = await firstValueFrom(
      this.http.get<Product>(`https://dummyjson.com/products/${id}`)
    )

    return {
      ...response.data,
      discountedPrice: this.calcDiscountedPrice(
        response.data.price,
        response.data.discountPercentage
      )
    }
  }
}
