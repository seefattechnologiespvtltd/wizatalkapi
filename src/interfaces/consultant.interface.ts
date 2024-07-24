import { ObjectId } from "mongoose";

export interface IConsultant {
    _id: string;
    name: string;
    email: string;
    picture: string;
    phone_number: string;
    specialties: ObjectId[];
    languages: string[];
    about: string;
    company: string;
    experience: string;
  }
  