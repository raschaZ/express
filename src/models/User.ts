import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement } from 'sequelize-typescript';


@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id!: number;

  @AllowNull(false)
  @Column({
    type : DataType.STRING
  })  
  name!: string;

  @AllowNull(false)
  @Column({
    type : DataType.STRING
  }) 
  email!: string;
  
  @AllowNull(false)
  @Column({
    type : DataType.STRING
  })
  password!: string ;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  resetToken!: string | null;

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
  })  
  resetTokenExpiresAt!: Date | null;
}

