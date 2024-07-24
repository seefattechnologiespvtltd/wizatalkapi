import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsPhoneNumber('IN')
  public phone_number: string;

  @IsString()
  public password: string;
}
