import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public phone_number: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  public company: string;

  @IsString()
  public role: string;

  @IsString()
  public consultant: string;
}

export class DeviceTokenLoginDto {
  @IsString()
  @IsNotEmpty()
  public device_token: string;
}

export class CheckUserExistDto {
  @IsPhoneNumber('IN')
  @IsNotEmpty()
  public phone_number: string;

  @IsString()
  @IsNotEmpty()
  public device_token: string;
}

export class PushNotificationDto {
  @IsString()
  @IsNotEmpty()
  public _id: string;

  @IsString()
  @IsNotEmpty()
  public otherUserId: string;

  @IsString()
  @IsNotEmpty()
  public type: string;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public body: string;
}


