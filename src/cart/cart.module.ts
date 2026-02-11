import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrderItem, OrderItemSchema } from './schemas/order-item.schema'
import { Order, OrderSchema } from './schemas/order.schema'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderItem.name, schema: OrderItemSchema }
    ])
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
