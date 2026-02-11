import { Controller, Get, Post, Body, Param } from '@nestjs/common'

import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: UserDto) {
    return this.userService.create(body.name)
  }

  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id)
  }
}
