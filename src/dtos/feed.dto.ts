import { IsOptional, IsString } from "class-validator";

export class CreateFeedDto {
    @IsString()
    public title: string;
  
    @IsString()
    @IsOptional()
    public description: string;

  }
  