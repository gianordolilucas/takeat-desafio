import { Model, Column, DataType, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
})
export default class Address extends Model {
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Street is required'
      }
    }
  })
  street!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Number is required'
      },
    }
  })
  number!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 255],
        msg: 'Complement must be less than 255 characters'
      }
    }
  })
  complement!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Neighborhood is required'
      }
    }
  })
  neighborhood!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'City is required'
      }
    }
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'State is required'
      },
    }
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Country is required'
      },
    }
  })
  country!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Postal code is required'
      },
      is: {
        args: /^[0-9]{5}-?[0-9]{3}$/, // Brazilian postal code format
        msg: 'Postal code must be a valid Brazilian format (XXXXX-XXX)'
      }
    }
  })
  postal_code!: string;
}
