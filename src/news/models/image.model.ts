import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { News } from './news.model';
import { UUID } from 'crypto';

@Table
export class Images extends Model<News> {
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    imageUrl: string;

    // @PrimaryKey
    // @ForeignKey(() => News)
    // @Column({
    //     type: DataType.INTEGER,
    //     allowNull: false,
    // })
    // imageId: number;

    @ForeignKey(() => News)
    @Column
    newsId: number;

    @BelongsTo(() => News)
    news: News;
}
