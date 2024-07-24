import { ArrayMinSize, IsArray, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateSendOTPDto {
  @IsPhoneNumber('IN')
  public phone_number: string;
}

export class CreateVerifyOTPDto {
  @IsPhoneNumber('IN')
  public phone_number: string;
  
  @IsString()
  public code: string;

  @IsString()
  public device_token: string;
}


export class CreateUserDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsPhoneNumber('IN')
  public phone_number: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  public categories: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  public countries: string[];

  @IsString()
  @IsOptional()
  public profile: string;
}
