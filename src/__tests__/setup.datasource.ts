import { DataSource } from "typeorm";
import rdbmsConfig from '../config/rdbms';

export const appTestDataSource = new DataSource(rdbmsConfig);