import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateSendOTPDto, CreateUserDto, CreateVerifyOTPDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import loginModel from '@/models/login.model';
import { ILogin } from '@/interfaces/login.interface';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } from '@config';
import userModel from '@/models/users.model';
import roleModel from '@/models/role.model';
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

class AuthService {
  public loginModel = loginModel;
  public userModel = userModel;
  public roleModel = roleModel;

  public async sendOTP(loginData: CreateSendOTPDto): Promise<void> {
    if (isEmpty(loginData)) throw new HttpException(400, 'Phone number is empty');

    let findUser: ILogin = await this.loginModel.findOne({ phone_number: loginData.phone_number });
    if (!findUser) {
      const role = await this.roleModel.findOne({ name: "User" });

      const createdUser = await this.userModel.create({
        name: loginData.phone_number,
        email: loginData.phone_number + "@gmail.com",
        phone_number: loginData.phone_number
      });

      await this.loginModel.create({
        phone_number: loginData.phone_number,
        user: createdUser._id,
        email: loginData.phone_number + "@gmail.com",
        role: role._id,
        isNew: true,
      });
    }

    await twilio.verify.v2.services(VERIFICATION_SID).verifications.create({ to: loginData.phone_number, channel: 'sms' });
  }

  public async verifyOTP(verifyOTPData: CreateVerifyOTPDto): Promise<{ cookie: string; findUser: ILogin, token: string; }> {
    if (isEmpty(verifyOTPData)) throw new HttpException(400, 'Verify OTP Data is empty');

    let findUser: ILogin = await this.loginModel.findOne({ phone_number: verifyOTPData.phone_number });
    if (!findUser) {
      throw new HttpException(400, 'Phone number is not valid');
    }

    const verification_check = await twilio.verify.v2.services(VERIFICATION_SID)
      .verificationChecks
      .create({ to: verifyOTPData.phone_number, code: verifyOTPData.code });

    if (verification_check.status == 'approved') {
      
      await this.loginModel.findByIdAndUpdate(findUser._id, { $addToSet: { device_tokens: verifyOTPData.device_token } });

      const tokenData: any = this.createToken(findUser);
      const cookie = this.createCookie(tokenData);
      if (findUser.user != null) {
        findUser = await this.loginModel.findOne({ _id: findUser._id }).populate('role').populate('user');
      } else {
        findUser = await this.loginModel.findOne({ _id: findUser._id }).populate('role').populate('consultant');
      }
      return { cookie, findUser, token: tokenData.token };
    } else {
      throw new HttpException(400, 'Code is Incorrect');
    }
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: ILogin, token: string; }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    let findUser: ILogin = await this.loginModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const tokenData: any = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    await loginModel.update({ _id: findUser._id }, { $push: { tokens: tokenData.token } });

    findUser = await this.loginModel.findOne({ email: userData.email }).populate('role').populate('company');

    return { cookie, findUser, token: tokenData.token };
  }

  public async logout(userData: ILogin, token: string): Promise<ILogin> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: ILogin = await this.loginModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    await loginModel.update({ _id: findUser._id }, { $pull: { tokens: token } }, { multi: true });

    return findUser;
  }

  public createToken(user: ILogin): TokenData {
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    //return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    return `Authorization=${tokenData.token}; HttpOnly;`;
  }
}

export default AuthService;
