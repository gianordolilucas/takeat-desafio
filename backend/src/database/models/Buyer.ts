import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "./Order";

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
})
export default class Buyer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER, 
  })
  id!: number;

  @Column({allowNull: true})
  name?: string;

  @Column({allowNull: false})
  phone!: string;


  @HasMany(() => Order)
  orders!: Order[];
}