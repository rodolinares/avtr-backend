import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductModule } from './product/product.module'

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/avtr'), ProductModule]
})
export class AppModule {}
