import { IsOptional, IsString,IsArray,ValidateNested } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from "class-transformer";



class TagConditionDto{
    @IsString()
    @IsOptional()
    name:string
    
    // @IsArray()
    // @IsOptional()
    // value:string

    @IsString()
    @IsOptional()
    type:string[]
}

export class UpdateTagDto{

    @IsOptional()
    @IsString()
    @ApiProperty()
    type:string

    @IsOptional()
    @IsString()
    @ApiProperty()
    value:string;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => TagConditionDto)
    @ApiProperty({
        type: TagConditionDto,
        example: [
            {
                name: 'string',
                type: 'string'
            }
        ]
    })
    conditions?:TagConditionDto[]


    @IsOptional()
    @IsString()
    @ApiProperty()
    resource:string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    resourceCode:string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    resourceType:string;

}