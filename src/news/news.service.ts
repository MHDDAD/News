import { Injectable } from '@nestjs/common';
import { News } from './models/news.model';
import { InjectModel } from '@nestjs/sequelize';
import { Images } from './models/image.model';
import { Videos } from './models/video.model';
import { Categorys } from "./models/category.model"
import { Op } from 'sequelize';

interface NewestNewsParams {
  newsCategory: string,
  pagination: number,
  newsTags: string,
  rating: number

}

interface CreateNewsParams {
  title: string,
  newsCategory: string,
  content: string,
  rating: number,
  newsTags: string,
  images: { url: string }[],
  videos: { url: string }[]


}



@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News)
    private readonly newsModel: typeof News,
    @InjectModel(Images)
    private imageModel: typeof Images,
    @InjectModel(Videos)
    private videoModel: typeof Videos,
    @InjectModel(Categorys)
    private categoryModel: typeof Categorys,
  ) { }


  async getNewestNews({ pagination }: NewestNewsParams) {
    const newestNews = await this.newsModel.findAll({
      limit: pagination,
      order: [['createdAt', 'DESC']],
      include: [{
        model: Images,
        as: 'images'
      },
      {
        model: Videos,
        as: 'videos'
      }
      ]
    })

    return newestNews

  }


  async getNewsByCategory(newsCategory: string) {
    const news = await this.newsModel.findAll({
      where: {
        newsCategory
      },include: [{
        model: Images,
        as: 'images'
      },
      {
        model: Videos,
        as: 'videos'
      }
      ]
    })
    return news
  }




  async getBySearch(searchQuery: string) {
    // search = "HI"
    const news = await this.newsModel.findAll({
      where: {
        title: {
          [Op.iLike]: `%${searchQuery}%`
        }
      }
    })
    console.log(news);
    return news
  }


  async createNews({ title, newsCategory, content, rating, images, videos }: CreateNewsParams) {
    const news = await this.newsModel.create({
      title,
      content,
      rating,
      newsCategory
    })
    console.log(news);

    const newsImage = images.map((image) => {
      return { ...image, newsId: news.id }
    })
    const newsVideos = videos.map((video) => {
      return { ...video, newsId: news.id }
    })
    // const newsCategory = categorys.map((category)=>{
    //   return { ...category, newsId: news.id }
    // })
    await this.imageModel.bulkCreate(newsImage)
    await this.videoModel.bulkCreate(newsVideos)
    // await this.categoryModel.bulkCreate(newsCategory)






  }


















}
