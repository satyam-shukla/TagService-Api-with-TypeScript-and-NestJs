import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from "class-validator";


export class FilterTagDto{
    @IsOptional()
    @ApiPropertyOptional()
    type?: string;

    @IsOptional()
    @ApiPropertyOptional()
    value?: string;

    @IsOptional()
    @ApiPropertyOptional()
    resource?: string;

    @IsOptional()
    @ApiPropertyOptional()
    resourceCode?: string;
    

    @IsOptional()
    @ApiPropertyOptional()
    resourceType: string;

}


