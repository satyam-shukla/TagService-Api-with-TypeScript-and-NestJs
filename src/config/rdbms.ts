import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { TagEntity } from "../tag/Entities/tag.entity";
import * as dotenv from 'dotenv';
dotenv.config()

export const config = {
    test:{
        type:'mysql',
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        username:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD,
        database:"tagtestdb",
        entities: [TagEntity],
        synchronize: true,
        migrations:[],

    },
    development:{
        type:"mysql",
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        username:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD,
        database:"tagservice",
        entities: [TagEntity],
        synchronize: true,
        migrations:[],
        // migrationsRun:true,
        // logging: true,
    }
}

const getRdbmsConfig = (env?: string) => {
    if(!env){
        env = 'development';
    }

    const configuration: MysqlConnectionOptions = config[env];
    return configuration
}


const rdbmsConfig = getRdbmsConfig(process.env.NODE_ENV);
export default rdbmsConfig



