import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { TagEntity } from './Entities/tag.entity';
import {Repository} from 'typeorm'
import { createTagDto } from './dto/CreateTagDto';
import { tagStatus } from '../common/constants/tag.status';
import { FilterTagDto } from './dto/FilterTagDto';
import { UpdateTagDto } from './dto/updateTagDto';
import { ITagCondition } from './dto/CreateTagDto';

@Injectable()
export class TagService {
    constructor(@InjectRepository(TagEntity) private readonly TagEntity:Repository<TagEntity>){}
    async getTag(id:string){
        const tag = await this.TagEntity.findOne({where:{id:parseInt(id)}})
        if(!tag){
            throw new NotFoundException("Sorry! given id is not found")
        }
        console.log(tag)
        return tag
    }

    async getTags(query:FilterTagDto){
        
        const [result,total] = await this.TagEntity.findAndCount({
            take:10,
            where:{...query}
        }) 
        return {
            total:total,
            data:result
        }

    }

    async createTag(payload:createTagDto){
        let existingTag = await this.TagEntity.findOne({
            where: {
                type:payload.type,
                value:payload.value,
                resource:payload.resource,
                resourceCode:payload.resourceCode,
                resourceType:payload.resourceType
            }
        });
        if(!existingTag){
            const dataToInsert: Partial<TagEntity> = {
                ...payload,
                conditions: JSON.stringify(payload.conditions || []),
                status: tagStatus.ACTIVE,
                isDynamic: !!payload.conditions,
                };
                const newTag = await this.TagEntity.create(dataToInsert)
                return await this.TagEntity.save(newTag)
        }
        else{
            let existingConditionTag = JSON.parse(existingTag.conditions)
            let mergeCondition = [...existingConditionTag,...payload.conditions]
            const output = []
            for(let condition of mergeCondition){
                const existsCondition = output.filter((e)=>{
                    return e.name===condition.name && e.type === condition.type
                });
                if(existsCondition.length === 0){
                    output.push(condition)
                }
            };
            
            await this.TagEntity.save({
                ...existingTag,
                conditions: JSON.stringify(output)
            })
        }
    }  
    

    async deleteTag(id:string){
        let tag = await this.TagEntity.findOne({where:{id:parseInt(id)}})
        if(!tag){
            throw new NotFoundException()
        }
        tag.status = tagStatus.iNACTIVE
        return this.TagEntity.save(tag)
    }
    
    async updateTag(id:string,payload:UpdateTagDto){
        let editTag = await this.TagEntity.findOne({where:{id:parseInt(id)}})
        console.log(editTag)
        if(!editTag){
             throw new NotFoundException("Given id is not find")
        }
        let condition = JSON.parse(editTag.conditions)
        condition.name = payload.conditions[0].name
        condition.type = payload.conditions[0].type
        editTag.type=payload.type
        editTag.conditions=JSON.stringify(payload.conditions)
        editTag.resource=payload.resource
        editTag.resourceCode=payload.resourceCode
        editTag.resourceType=payload.type
        editTag.value=payload.value
        return await this.TagEntity.update({id:editTag.id},{...editTag})
    }
}
