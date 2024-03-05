import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(Users.name) private usersModule: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const plainToHash = await hash(password, 10);
    createUserDto = {...createUserDto, password:plainToHash};
    return this.usersModule.create(createUserDto);
  }

  async findAll() {
    const usersList = await this.usersModule.find({});
    return usersList;
  }

  async findOne(id : string) {
    const user = await this.usersModule.findOne({ _id: id }).exec();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const plainToHash = await hash(password, 10);
    updateUserDto = {...updateUserDto, password:plainToHash};
    await this.usersModule.findOneAndUpdate({ _id: id }, updateUserDto);
    return 'user updated';
  }

  async remove(id: string) {
    await this.usersModule.deleteOne({ _id: id }).exec();
    return 'user deleted';
  }
}
