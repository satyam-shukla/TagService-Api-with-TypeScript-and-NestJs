import * as request from "supertest";
import {INestApplication} from "@nestjs/common";

const endpoint = '/tag'


export const postTag = async(tag:any,app:INestApplication) => {
    return request(app.getHttpServer())
        .post(endpoint)
        .send(tag)
        .set("Accept", "application/json") 
}


export const getTag = async(queries:object,app:INestApplication)=>{
    const queryString = new URLSearchParams();
    for(const query of Object.keys(queries)){
        queryString.set(query,queries[query])
    }
    return request(app.getHttpServer())
    .get(`${endpoint}?${queryString}`)
    .set("Accept", "application/json");
}

export const getTagById = async(tagId:string,app:INestApplication)=>{
    
    return request(app.getHttpServer())
        .get(`${endpoint}/${tagId}`)
        .set("Accept", "application/json");
}



export const updateTag = async(tagId:string,tag:any,app:INestApplication)=>{
    return request(app.getHttpServer())
    .get(`${endpoint}/${tagId}`)
    .set('Accept',"application/json")
}


export const deleteTag = async(tagId:string,app:INestApplication)=>{
    return request(app.getHttpServer())
    .get(`${endpoint}/${tagId}`)
    .set('Accept','application/json')
}