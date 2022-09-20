import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import rdbms from "../../config/rdbms"

@Injectable()
export class AppConfigService {
    
    constructor(){
       dotenv.config()
    }

    get isDevEnv(): boolean {
        return this.nodeEnv === "development";
      }
    
      get isProdEnv(): boolean {
        return this.nodeEnv === "production";
      }
    
      get isTestEnv(): boolean {
          return this.nodeEnv === "test";
      }
    
      get nodeEnv(): string {
        return this.get("NODE_ENV") || "development";
      }
      
      public get(key: string): string {
        return process.env[key];
      }
    
      public getNumber(key: string): number {
        console.log(" -- this.get(key) -- ", this.get(key))
        return Number(this.get(key));
      }
    
      
      get sqlConfig():TypeOrmModuleOptions{
        console.log(rdbms)
        return {
            ...rdbms
        }
      }

}