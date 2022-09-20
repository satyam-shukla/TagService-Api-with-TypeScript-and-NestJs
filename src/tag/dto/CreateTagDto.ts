import { Type } from "class-transformer";
import { IsArray, IsString , IsDefined, ValidateNested, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export interface ITagCondition {
    name: string;
    type: string;
    // value: string[]
}

interface ITag {
    type: string;
    value: string;
    resource: string;
    resourceCode: string;
    resourceType: string;
    conditions?: ITagCondition[]
}

class tagConditionDto implements ITagCondition{
    @IsDefined()
    @IsString()
    name:string;

    @IsDefined()
    @IsString()
    type:string;

    // @IsDefined()
    // @IsArray()
    // value:string[]
}

export class createTagDto implements ITag{

    @IsString()
    @ApiProperty()
    type:string

    @IsString()
    @ApiProperty()
    value:string;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => tagConditionDto)
    @ApiProperty({
        type: tagConditionDto,
        example: [
            {
                name: 'string',
                type: 'string'
            }
        ]
    })
    conditions?:tagConditionDto[] = []

    @IsString()
    @ApiProperty()
    resource:string;

    @IsString()
    @ApiProperty()
    resourceType:string;

    @IsString()
    @ApiProperty()
    resourceCode:string;
}


