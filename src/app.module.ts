
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { NewsModule } from './news/news.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { News } from './news/news.model';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      models: [User, News],
      autoLoadModels: true,
      synchronize: true,
    }),
    NewsModule,
    UsersModule,
    AuthModule],
  controllers: [
    AppController, UsersController],
  providers: [
    AppService, UsersService],
})
export class AppModule { }
