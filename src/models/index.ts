// database.ts
import { Sequelize } from 'sequelize-typescript';
import config from '../sequelize';
import { User } from '../models/User';
import { Task } from '../models/Task';

// define the relations in a separate file
export function defineAssociations() {
  User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
  Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });
}


