import { HttpService } from '@nestjs/axios'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { firstValueFrom } from 'rxjs'

import { OrderItem } from './schemas/order-item.schema'
import { Order } from './schemas/order.schema'

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItem>,
    private httpService: HttpService
  ) {}

  async addProduct(user: string, product: number, amount: number) {
    let cart = await this.orderModel.findOne({
      user: new Types.ObjectId(user)
    })

    if (!cart) {
      cart = await this.orderModel.create({
        user: new Types.ObjectId(user),
        total: 0
      })
    }

    const response = await firstValueFrom(
      this.httpService.get(`https://dummyjson.com/products/${product}`)
    )

    const productData = response.data

    const existingItem = await this.orderItemModel.findOne({
      cart: cart._id,
      product: product
    })

    if (existingItem) {
      existingItem.amount += amount
      await existingItem.save()
    } else {
      await this.orderItemModel.create({
        cart: cart._id,
        product: productData.id,
        sku: productData.sku,
        price: productData.price,
        amount,
        title: productData.title,
        thumbnail: productData.thumbnail,
        brand: productData.brand,
        discountPercentage: productData.discountPercentage
      })
    }

    await this.calcTotal(cart._id.toString())

    return this.getCart(user)
  }

  async getCart(user: string) {
    const cart = await this.orderModel.findOne({
      user: new Types.ObjectId(user)
    })

    if (!cart) {
      return { message: 'El usuario no tiene carrito activo', items: [] }
    }

    const items = await this.orderItemModel.find({ cart: cart._id })

    return { cart, items }
  }

  async removeProduct(user: string, item: string) {
    const cart = await this.orderModel.findOne({
      user: new Types.ObjectId(user)
    })

    if (!cart) {
      throw new NotFoundException('Carrito no encontrado')
    }

    const itemData = await this.orderItemModel.findById(item)
    if (!itemData) {
      throw new NotFoundException('Producto no encontrado en el carrito')
    }

    await this.orderItemModel.findByIdAndDelete(item)
    await this.calcTotal(cart._id.toString())

    return this.getCart(user)
  }

  private async calcTotal(cart: string) {
    const items = await this.orderItemModel.find({
      cart: new Types.ObjectId(cart)
    })

    const total = items.reduce((sum, item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage / 100)
      return sum + discountedPrice * item.amount
    }, 0)

    await this.orderModel.findByIdAndUpdate(cart, {
      total: parseFloat(total.toFixed(2))
    })
  }
}
