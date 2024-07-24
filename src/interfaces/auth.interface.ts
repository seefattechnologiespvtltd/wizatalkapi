import { Request } from 'express';
import { ICompany } from './company.interface';
import { ILogin } from './login.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  //req: ILogin & import("mongoose").Document<any, any, any> & { _id: import("mongoose").Types.ObjectId; };
  user: ILogin;
}

export interface RequestWithCompany extends Request {
  company: ICompany;
}

export interface RequestWithConsultant extends Request {
  company: ICompany;
}

