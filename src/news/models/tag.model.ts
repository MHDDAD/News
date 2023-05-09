import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';

import { News } from './news.model';

@Table
export class Tags extends Model<News> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  tagTitle: string;

  @PrimaryKey
  @ForeignKey(() => News)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tagId: number;

  @BelongsTo(() => News, ('newsId'))
  news: News;
}
