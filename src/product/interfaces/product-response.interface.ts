import { Product, ProductExtended } from './product.interface'

export interface ProductResponse {
  products: Product[] | ProductExtended[]
  total: number
  skip: number
  limit: number
}
