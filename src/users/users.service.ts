import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt()
    const hashedPaswword = await bcrypt.hash(createUserDto.password, salt)

    return this.userModel.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phone: createUserDto.phone,
      password: hashedPaswword,
    });
  }


  

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({where: {id} })
  }




  findOneUserByPhone(phone: string): Promise<User> {

    try {
      return this.userModel.findOne<User | undefined>({ where: { phone:phone } })
    
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }

  }

  // async remove(id: string): Promise<void> {
  //   const user = await this.findOne(id),
  //   await user.destroy();
  //   // console.log("User Deleted");
  // }
}