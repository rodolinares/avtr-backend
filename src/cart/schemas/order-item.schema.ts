import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema()
export class OrderItem extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  cart: Types.ObjectId

  @Prop({ required: true })
  product: number

  @Prop({ required: true })
  sku: string

  @Prop({ required: true })
  price: number

  @Prop({ required: true })
  amount: number

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  thumbnail: string

  @Prop({ required: true })
  brand: string

  @Prop({ required: true })
  discountPercentage: number
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem)
