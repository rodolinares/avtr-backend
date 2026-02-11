import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductModule } from './product/product.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/avtr'), ProductModule, UserModule]
})
export class AppModule {}
