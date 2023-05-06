
import { AutoIncrement, BelongsTo, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class News extends Model {


  @Column
  title: string;

  @Column
  context: string;

  @Column
  creator: string;

  @Column
  tags: string

  @Column
  picture: string

  @Column
  videos: string

  @Column
  source: string
}