import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Product from './Product';
import Buyer from './Buyer';
import Restaurant from './Restaurant';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
})
export class Order extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER, 
  })
  id!: number;

  @ForeignKey(() => Product)
  @Column
  product_id!: number;

  @Column({ allowNull: false })
  amount!: number;

  @Column({ allowNull: false, type: DataType.FLOAT })
  total_price!: number;

  @Column({ allowNull: false, type: DataType.FLOAT })
  total_service_price!: number;

  @ForeignKey(() => Restaurant)
  @Column
  restaurant_id!: number; 

  @ForeignKey(() => Buyer)
  @Column
  buyer_id!: number;

  @BelongsTo(() => Buyer)
  buyer!: Buyer;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  canceled_at!: Date | null;
}
