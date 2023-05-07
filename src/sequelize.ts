import { Sequelize } from 'sequelize-typescript';
import config from './config/config';
import { User } from './models/User';
import { Task } from './models/Task';
import { defineAssociations } from './models/index';

const { dialect, database, username, password } = config.db;

export const sequelize = new Sequelize(database, username, password, {
  dialect,
  models: [User, Task],
});

// define model associations
defineAssociations();

export default sequelize;
