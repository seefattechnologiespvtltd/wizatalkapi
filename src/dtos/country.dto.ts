import { IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  public name: string;
}
