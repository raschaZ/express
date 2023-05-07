import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'tasks' })
export class Task extends Model {
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
  title!: string;

  @AllowNull(false)
  @Column({
    type : DataType.STRING
  }) 
  description!: string;
  
  @AllowNull(false)
  @Column({
    type : DataType.BOOLEAN
  })
  completed!: boolean ;
  
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  userId!: number;

}