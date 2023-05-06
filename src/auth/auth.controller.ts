
// import { Body, Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(
//     private authService: AuthService) { }

//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   signIn(@Body() signInDto: Record<string, any>) {
//     return this.authService.signIn(signInDto.username, signInDto.password);
//   }


//   @Post('register')
//   @UsePipes(ValidationPipe)
//   async create(@Body() createUserDto: CreateUserDto): Promise<any> {
//     const user = await this.usersService.create(createUserDto);
//     return user.firstName + ' ' + user.lastName + '  registered'
//   }




// }


import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }



  @Post('login')
  validateUserByPhone(@Body() body: Record<string, any>) {

    const user = this.authService.validateUserByPhone(body.phone, body.password)
    return user

  }


  @Post('signup')
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = await this.authService.create(createUserDto);
    if (user) {
      return user.firstName + ' ' + user.lastName + '  registered'
    } else {
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    const user = this.authService.findAll();
    return this.authService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<User> {
  //   return this.usersService.findOne(id);
  // }



  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.usersService.remove(id) 
  // }
}
