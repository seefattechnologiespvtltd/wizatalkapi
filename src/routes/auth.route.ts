import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateSendOTPDto, CreateUserDto, CreateVerifyOTPDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class AuthRoute implements Routes {
  public path = '/auth/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}send-otp`, validationMiddleware(CreateSendOTPDto, 'body'), this.authController.sendOTP);
    this.router.post(`${this.path}verify-otp`, validationMiddleware(CreateVerifyOTPDto, 'body'), this.authController.verifyOTP);
    this.router.post(`${this.path}login`, this.authController.webLogin);
    
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
