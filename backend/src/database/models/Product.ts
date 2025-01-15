import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Restaurant from "./Restaurant";

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
})
export default class Product extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER, 
  })
  id!: number;

  @Column({allowNull: false})
  name!: string;

  @Column({allowNull: true})
  description!: string;

  @Column({allowNull: false})
  value!: number;

  @Column({allowNull: false})
  @ForeignKey(() => Restaurant)
  restaurant_id!: number;

  @BelongsTo(() => Restaurant)
  restaurant!: Restaurant;

  @Column({allowNull: true, defaultValue: null, type: DataType.DATE})  
  canceled_at!: Date | null;

}