import { IsString } from 'class-validator';

export class CreateSpecialityDto {
  @IsString()
  public name: string;
}
