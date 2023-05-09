
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Images } from './image.model';
import { Videos } from './video.model';
import { Categorys } from './category.model';
import { NewsCategory } from './NewsCategory.model';

// @Table
// export class News extends Model {
//   @Column
//   title: string;

//   @Column
//   newsId: number;


//   @Column
//   context: string;

//   @Column
//   creator: string;

//   @Column
//   tags: string

//   @Column
//   picture: string

//   @Column
//   videos: string

//   @Column
//   source: string

// }

@Table
export class News extends Model<News> {

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.ENUM('social', 'economy', 'politics', 'sport'),
    allowNull: false,
  })
  newsCategory: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  creator: string;


  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  newsTags: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  source: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  hottestNews: boolean;

  @HasMany(() => Images)
  images: Images[]

  @HasMany(() => Videos)
  videos: Videos[]

  @HasMany(() => Categorys)
  categorys: Categorys[];



  // @BelongsTo(() => Tags, 'tagId')
  // tags: Tags
  // @BelongsTo(() => Categorys, 'categoryId')
  // categorys: Categorys


}
















export enum RoleType {
  ADMIN = "admin",
  USER = "user"
}