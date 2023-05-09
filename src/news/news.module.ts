import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './models/news.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Images } from './models/image.model';
import { Videos } from './models/video.model';
import { Categorys } from './models/category.model';

@Module({
  imports: [SequelizeModule.forFeature([News,Images,Videos,Categorys])],
  providers: [NewsService],
  controllers: [NewsController]
})
export class NewsModule { }
