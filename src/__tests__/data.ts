
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import rdbmsConfig from '../config/rdbms';

const defaultCollection: string[] = [
  "tags"
];

const createTestData = async (connection: DataSource) => {     
  console.log("Loading data ...");
 if(!connection.isInitialized) {
    await connection.initialize();
 }
};

export default createTestData;
