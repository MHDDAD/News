

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SignupDto } from '../users/dto/auth.dto';
import { User } from './../users/models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'


interface SignupParams {
  phone: string,
  password: string,
  firstName: string,
  lastName: string
}

interface SignInParams {
  phone: string,
  password: string
}


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

  ) { }




  ///SIGN UP
  async signup({ phone, password, firstName, lastName }: SignupParams) {

    const userExist = await this.userModel.findOne({ where: { phone } })
    if (userExist) {

      throw new HttpException("user with this phone registed before.please sign in", HttpStatus.CONFLICT)
    }
    const salt = await bcrypt.genSalt()
    const hashedPaswword = await bcrypt.hash(password, salt)
    const user = await this.userModel.create({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      password: hashedPaswword,
    })
    const generatedToken = await this.generateToken(phone, firstName, lastName)

    return { generatedToken }
  }



  ///SIGN IN
  async signin({ phone, password }: SignInParams) {
    const user = await this.userModel.findOne({ where: { phone } })
    if (!user) {
      throw new HttpException("This user dont exist! Signup Please", HttpStatus.BAD_REQUEST)
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (validPass) {
      const { password, ...result } = user['dataValues']
      return this.generateToken(phone, user.firstName, user.lastName);
    } else throw new HttpException("Your password is wrong", HttpStatus.BAD_REQUEST)


  }

  async findOne(id): Promise<any> {
    console.log(id.id);
    return this.userModel.findOne({ where: { id:id.id } });
  }






  private async generateToken(phone: string, firstName: string, lastName: string) {
    const token = await jwt.sign({
      firstName,
      lastName,
      phone
    }, "sjsal;jljglashoihoiwjerf9w87e9rjulkojh3425789", { expiresIn: 36000 })

    return token

  }
}