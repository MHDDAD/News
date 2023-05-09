import { BelongsTo, Column, ForeignKey, Model, Table, BelongsToMany  } from "sequelize-typescript";
import { News } from "./news.model";
import { Categorys } from "./category.model";

@Table
export class NewsCategory extends Model<NewsCategory> {
  @Column
  @ForeignKey(()=> News)
  newsId: number;

  @Column
  @ForeignKey(()=> Categorys)
  categoryId: number;

  @BelongsTo(() => News)
  news: News;

  @BelongsTo(() => Categorys)
  category: Categorys;
}

// Associations
// News.belongsToMany(Categorys, { through: NewsCategory});
// Categorys.belongsToMany(News, { through: NewsCategory });