import { IsOptional, IsString } from "class-validator";

export class CreateShortDto {
    @IsString()
    public title: string;
  
    @IsString()
    @IsOptional()
    public description: string;

  }
  