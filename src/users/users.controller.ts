import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignupDto } from './dto/auth.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }




  @Post('register')
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: SignupDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);
    return user.firstName + ' ' + user.lastName + '  registered'
  }

  @Get()
  findAll(): Promise<User[]> {
    const user = this.usersService.findAll();
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<User> {
  //   return this.usersService.findOne(id);
  // }

  @Get('/:phone')
  findOneUserByPhone(@Param('phone') phone: string): Promise<User> {
    return this.usersService.findOneUserByPhone(phone);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.usersService.remove(id) 
  // }
}
