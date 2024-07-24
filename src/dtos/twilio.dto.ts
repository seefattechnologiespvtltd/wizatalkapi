import { IsString } from 'class-validator';

export class GetAccessTokenDto {
  @IsString()
  public _id: string;

  @IsString()
  public identity: string;
}
