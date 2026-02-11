import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from './schemas/user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(name: string): Promise<User> {
    const user = new this.userModel({ name })
    return user.save()
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec()
  }
}
