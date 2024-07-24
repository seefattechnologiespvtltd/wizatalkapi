import { IsArray, IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateConsultantDto {
    @IsString()
    @IsOptional()
    public _id: string;

    @IsString()
    public name: string;

    @IsEmail()
    public email: string;

    @IsPhoneNumber('IN')
    public phone_number: string;

    @IsArray()
    public specialties: ObjectId[];

    @IsArray()
    public languages: string[];

    @IsString()
    @IsOptional()
    public about: string;
}
