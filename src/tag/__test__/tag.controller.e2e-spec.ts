import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import {TagEntity} from "../Entities/tag.entity"
import { deleteTag, getTag, getTagById, postTag, updateTag } from './tag.controller.requests';
import { AppModule } from '../../app.module';




const tag1 = {
    type: "category",
    value: "Collect",
    conditions: [
      {
        name: "description",
        type: "contain",
      }
    ],
    resource: "Demand",
    resourceType: "Bank Transaction",
    resourceCode: "ICICI_id"
  }

  const tag2 = {
    type: "category",
    value: "Collect",
    resource: "Demand",
    resourceType: "Bank Transaction",
    resourceCode: "ICING_id"
  }

  const tag4 = {
    type: "category",
    value: "Collect",
    conditions: [
      {
        name: "description",
        type: "contain"
      },{
        name: "description",
        type: "and"
      }
    ],
    resource: "Demand",
    resourceType: "Bank Transaction",
    resourceId: "ICICI_id"
  }

  const query1 = {
    type: "category",
    value: "Collect",
    resource: "Demand",
    resourceType: "Bank Transaction",
    resourceCode: "ICICI_id"
  }

  const updateTagData = {
    type: 'category',
    value: 'Collect',
    conditions: [],
    isDynamic: true,
    resource: 'Demand',
    resourceType: 'Bank Transaction',
    resourceCode: 'ICIER_id',
  }

describe("Tag",()=>{
    let app:INestApplication;
    // let repository:Repository<TagEntity>;
    beforeAll(async()=>{
        const module = await Test.createTestingModule({
            imports:[AppModule],
        }).compile()

        app = module.createNestApplication();
        await app.init()
    })

    afterAll(async()=>{
        await app.close()
    })

    
    describe("/tag",()=>{
        it("should create  a Tag",async()=>{
            const res = await postTag(tag1,app)
            expect(res.body.message).toMatch(/Tag created/)
            expect(res.statusCode).toEqual(201)
        })

        it("should create Tag without conditions",async()=>{
            // should send tag without condition and should expect isDynamic === false
            const res = await postTag(tag2,app)
            expect(res.body.message).toMatch(/Tag created/)
            expect(res.statusCode).toEqual(201)
        })


        it("should add condition if same tag existed",async()=>{
            const res = await postTag(tag4,app)
            expect(res.body.message).toMatch(/Tag created/)
            expect(res.statusCode).toEqual(201)
        })

        it("should get tags",async()=>{
            const res = await getTag(query1,app)
            expect(res.statusCode).toEqual(200)
        })

        
        it("Should get Tag by Id",async()=>{
            const tags = await getTag(query1,app)
            const res = await getTagById(tags.body.data[0].id,app)
            expect(res.statusCode).toEqual(200)
        })
        
        it("should not get the Tag by id",async()=>{
            const res = await getTagById("9",app)
            expect(res.statusCode).toEqual(404)
        })


        it("should update a tag by id",async()=>{
            const tags=await getTag(query1,app)
            const res = await updateTag(tags.body.data[0].id,updateTag,app)
            expect(res.statusCode).toEqual(200)
        })

        it("should not  update Tag by id",async()=>{
            const tags = await getTag(query1,app)
            const res = await updateTag("9",updateTag,app)
            expect(res.statusCode).toEqual(404)
        })

        it("should delete tag by id",async()=>{
            const tags = await getTag(query1,app)
            const res = await deleteTag(tags.body.data[0].id,app)
            expect(res.statusCode).toEqual(200)
        })

        it("should not delete tag by id",async()=>{
            const tags = await getTag(query1,app)
            const res = await deleteTag("8",app)
            expect(res.statusCode).toEqual(404)
        })


    })
})

