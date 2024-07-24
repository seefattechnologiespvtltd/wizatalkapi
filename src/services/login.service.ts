import { hash } from 'bcrypt';
import { CheckUserExistDto, CreateLoginDto } from '@dtos/login.dto';
import { HttpException } from '@exceptions/HttpException';
import { ILogin } from '@interfaces/login.interface';
import LoginModel from '@models/login.model';
import { isEmpty } from '@utils/util';
import { ObjectId } from 'mongodb';

class LoginService {
  public Logins = LoginModel;

  public async findAllLogin(filter:any): Promise<ILogin[]> {
    const Logins: ILogin[] = await this.Logins.find(filter).populate('consultant').populate('user');
    return Logins;
  }

  public async findLoginById(LoginId: string): Promise<ILogin> {
    if (isEmpty(LoginId)) throw new HttpException(400, 'LoginId is empty');

    const findLogin: ILogin = await this.Logins.findOne({ _id: LoginId }).populate('role').populate('user');
    if (!findLogin) throw new HttpException(409, "Login doesn't exist");

    return findLogin;
  }

  public async findOne(filter: any): Promise<ILogin> {
    if (isEmpty(filter)) throw new HttpException(400, 'filter is empty');

    const findLogin: ILogin = await this.Logins.findOne(filter).populate('role').populate('user');;
    if (!findLogin) throw new HttpException(409, "Login doesn't exist");

    return findLogin;
  }

  public async createLogin(LoginData: CreateLoginDto): Promise<ILogin> {
    if (isEmpty(LoginData)) throw new HttpException(400, 'LoginData is empty');

    const findLogin: ILogin = await this.Logins.findOne({ email: LoginData.email });
    if (findLogin) throw new HttpException(409, `This email ${LoginData.email} already exists`);

    let createLoginData: ILogin;
    if (LoginData.password) {
      const hashedPassword = await hash(LoginData.password, 10);
      createLoginData = await this.Logins.create({ ...LoginData, password: hashedPassword });
    } else {
      createLoginData = await this.Logins.create({ ...LoginData });
    }

    return createLoginData;
  }

  public async updateLogin(LoginId: string, LoginData: any): Promise<ILogin> {
    if (isEmpty(LoginData)) throw new HttpException(400, 'LoginData is empty');

    if (LoginData.email) {
      const findLogin: ILogin = await this.Logins.findOne({ email: LoginData.email });
      if (findLogin && findLogin._id != LoginId) throw new HttpException(409, `This email ${LoginData.email} already exists`);
    }

    if (LoginData.password) {
      const hashedPassword = await hash(LoginData.password, 10);
      LoginData = { ...LoginData, password: hashedPassword };
    }

    const updateLoginById: ILogin = await this.Logins.findByIdAndUpdate(LoginId, LoginData, { new: true });
    if (!updateLoginById) throw new HttpException(409, "Login doesn't exist");

    return updateLoginById;
  }

  public async deleteLogin(filter: any): Promise<ILogin> {
    const findLogin: ILogin = await this.Logins.findOne(filter);
    if (!findLogin) throw new HttpException(409, "Login doesn't exist");

    const deleteLoginById: ILogin = await this.Logins.findByIdAndDelete(findLogin._id);
    if (!deleteLoginById) throw new HttpException(409, "Login doesn't exist");

    return deleteLoginById;
  }

  public async updateDeviceToken(loginId: string, device_token: string): Promise<ILogin> {
    if (isEmpty(device_token)) throw new HttpException(400, 'Device token is empty');

    const updateLoginById: ILogin = await this.Logins.findByIdAndUpdate(loginId, { $addToSet: { device_tokens: device_token } });
    if (!updateLoginById) throw new HttpException(409, "Login doesn't exist");


    return updateLoginById;
  }

  
  public async checkUserExist(data: CheckUserExistDto): Promise<ILogin> {
    if (isEmpty(data)) throw new HttpException(400, 'Data is empty');

    const loginData: ILogin = await this.Logins.findOne({ phone_number: data.phone_number });
    if (!loginData) throw new HttpException(409, "Login doesn't exist");
    return loginData;
  }
}

export default LoginService;
