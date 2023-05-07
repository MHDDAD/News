
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
import { SigninDto, SignupDto } from '../users/dto/auth.dto';
import { User } from '../users/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }



  @Post('signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() body: SignupDto): Promise<any> {
    return await this.authService.signup(body);

  }


  @Post('signin')
  signin(@Body() body: SigninDto): Promise<any> {

   return this.authService.signin(body)
  

  }

  @Get()
  findAll(): Promise<User[]> {
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
