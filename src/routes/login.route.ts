import { Router } from 'express';
import LoginController from '@controllers/login.controller';
import { CheckUserExistDto, CreateLoginDto, DeviceTokenLoginDto, PushNotificationDto } from '@dtos/login.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class LoginRoute implements Routes {
  public path = '/login';
  public router = Router();
  public loginController = new LoginController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.loginController.getLogin);
    this.router.get(`${this.path}/:id`, this.loginController.getLoginById);
    this.router.post(`${this.path}`, validationMiddleware(CreateLoginDto, 'body'), this.loginController.createLogin);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateLoginDto, 'body', true), this.loginController.updateLogin);
    this.router.delete(`${this.path}/:id`, this.loginController.deleteLogin);
    this.router.post(`${this.path}/device-token/:id`, validationMiddleware(DeviceTokenLoginDto, 'body', true), this.loginController.updateDeviceToken);

    this.router.post(`${this.path}/checkUserExist`, validationMiddleware(CheckUserExistDto, 'body', true), this.loginController.checkUserExist);
    this.router.post(`${this.path}/sendPushNotification`, validationMiddleware(PushNotificationDto, 'body', true), this.loginController.sendPushNotification);
  }
}

export default LoginRoute;
