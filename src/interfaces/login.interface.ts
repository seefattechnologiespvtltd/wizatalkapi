export interface ILogin {
  _id: string | any;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  company: string;
  consultant: string;
  user: string;
  password: string;
  tokens: [];
  isNew: boolean;
  device_tokens: string[];
}
