import { NextFunction, Request, Response } from 'express';
import { CreateSendOTPDto, CreateUserDto, CreateVerifyOTPDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import { ILogin } from '@/interfaces/login.interface';

class AuthController {
  public authService = new AuthService();

  public sendOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateSendOTPDto = req.body;
      await this.authService.sendOTP(data);

      res.status(200).json({ isSuccess: true, message: 'OTP Sent! Check your messages for the code.' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  };

  public verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateVerifyOTPDto = req.body;
      const { cookie, findUser, token }  = await this.authService.verifyOTP(data);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, token: token, isSuccess: true, message: 'OTP Successfully Verified!' });
    } catch (error) {
      next(error);
    }
  };

  public webLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      console.log("userData: ", userData)
      const { cookie, findUser, token } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, token: token, isSuccess: true, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: ILogin = req.user;
      const token = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
      const logOutUserData: ILogin = await this.authService.logout(userData, token);
      
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, isSuccess: true, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
