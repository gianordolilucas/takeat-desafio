import { Model, Column, DataType, Table, BeforeCreate, BeforeUpdate, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import Address from './Address';
import Product from './Product';

const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/; // Brazilian phone number format

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
})
export default class Restaurant extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER, 
  })
  id!: number;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Username is required' },
      is: /^[^\s]+$/,
      len: {
        args: [3, 255],
        msg: 'Username must be between 3 and 255 characters long'
      }
    }
  })
  username!: string;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Email is required' },
      isEmail: { msg: 'Email must be a valid email address' },
    },
  })
  email!: string;

 
  @Column({
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Password is required' },
      len: {
        args: [6,40],
        msg: 'Password must be at least 6 characters long',
      },
    },
  })
  password!: string;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Phone is required' },
      is: {
        args: [phoneRegex],
        msg: 'Phone must be a valid phone number',
      },
    },
  })
  phone!: string;

  @Column({
    defaultValue: false, 
    allowNull: false,
    validate: {
      isBoolean: { msg: 'Has service tax must be a boolean' },
    },})
  has_service_tax!: boolean;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null})
  canceled_at!: Date | null;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    onDelete: 'CASCADE'
  })
  address_id!: number;

  @BelongsTo(() => Address)
  address!: Address;

  @HasMany(() => Product)
  products!: Product[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(restaurant: Restaurant) {
    if (restaurant.password) {
      restaurant.password = await bcrypt.hash(restaurant.password, 10);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

}