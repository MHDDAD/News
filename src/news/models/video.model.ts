import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { News } from './news.model';

@Table
export class Videos extends Model<News> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  videoUrl: string;

  // @PrimaryKey
  // @AutoIncrement
  // @ForeignKey(() => News)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // videoId: number;

  // @BelongsTo(() => News, ('newsId'))
  // news: News;
  @ForeignKey(() => News)
    @Column
    newsId: number;

    @BelongsTo(() => News)
    news: News;
}

