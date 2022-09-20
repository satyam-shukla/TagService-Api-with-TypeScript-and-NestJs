import "../config/envSetup";
import "reflect-metadata";
import createTestData from "./data";
import {appTestDataSource } from './setup.datasource'

export default async () => {
    console.log("Executing the global init script *****************************************");
    const connection = await appTestDataSource.initialize();
    await createTestData(connection);
};


