
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { NewsModule } from './news/news.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { News } from './news/models/news.model';
import { Tags } from './news/models/tag.model';
import { Categorys } from './news/models/category.model';
import { Videos } from './news/models/video.model';
import { Images } from './news/models/image.model';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { NewsCategory } from './news/models/NewsCategory.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      models: [User,
         News,
          Images,
          Videos,
          Tags,
          Categorys,
          NewsCategory],
      autoLoadModels: true,
      synchronize: true,
    }),
    NewsModule,
    UsersModule,
    AuthModule],
  controllers: [
    AppController,
    UsersController],
  providers: [
    AppService,
    UsersService],
})
export class AppModule { }
