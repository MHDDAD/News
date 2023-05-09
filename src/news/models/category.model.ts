import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, BelongsToMany } from 'sequelize-typescript';

import { News } from './news.model';
import { NewsCategory } from './NewsCategory.model';

@Table
export class Categorys extends Model<News> {


  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  categry: string;

  @ForeignKey(() => News)
  @Column
  newsId: number;
  

  @BelongsTo (() => News)
  news: News[];
}
