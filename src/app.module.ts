import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CartModule } from './cart/cart.module'
import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/avtr'),
    CartModule,
    ProductModule,
    UserModule
  ]
})
export class AppModule {}
