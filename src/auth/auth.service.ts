

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { User } from './../users/models/user.model';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    ) { }



///SIGN UP
  async create(createUserDto: CreateUserDto): Promise<User> {
    
      const salt = await bcrypt.genSalt()
      const hashedPaswword = await bcrypt.hash(createUserDto.password, salt)
try {
  const user = await this.userModel.create({
    firstName: createUserDto.firstName,
    lastName: createUserDto.lastName,
    phone: createUserDto.phone,
    password: hashedPaswword,
  });
  
  return user 
  
} catch (error) {
  throw new HttpException("user with this phone registed before.please sign in", HttpStatus.BAD_REQUEST)
}
  }



//////SIGN IN
  async validateUserByPhone(phone, password) {

    const user = await this.userModel.findOne({ where: { phone: phone } });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const { password, ...result } = user['dataValues']
        return result;

      } else {
        throw new HttpException("your password is wrong", HttpStatus.BAD_REQUEST)
      }

    } else {
      throw new HttpException("user dont exist!please sign up", HttpStatus.BAD_REQUEST)
    }
  }


  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }





}
