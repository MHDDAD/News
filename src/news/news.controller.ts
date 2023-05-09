import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }


  @Get('main')

  getNewestNews(@Body() body){
    return this.newsService.getNewestNews(body)
  }
  



@Post('create')
createNews(@Body() body){
  return this.newsService.createNews(body)
}



// @Get('/search')
// getBySearch(@Query('q') searchQuery: string){
//   return this.newsService.getBySearch(searchQuery)
// }

@Get(':category')
getByCategory(@Param('category') category:string){
  return this.newsService.getNewsByCategory(category)
}



}
