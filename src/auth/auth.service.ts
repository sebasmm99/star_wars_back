import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Users, UsersDocument } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel(Users.name) private readonly usersModule: Model<UsersDocument>,
    private jwtService:JwtService
  ) {}
  
  async register(userObject:RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = {...userObject, password:plainToHash};
    return this.usersModule.create(userObject);
  }

  async login(userObjectLogin:LoginAuthDto) {
    const {email, password} = userObjectLogin;
    const findUser = await this.usersModule.findOne({ email });
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 400); 

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);

    const payload = { id: findUser._id, name: findUser.name }
    const token =  this.jwtService.sign(payload);

    const data = {
      user:findUser,
      token,
    };

    return data; 

  }
  
}
