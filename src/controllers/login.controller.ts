import { NextFunction, Request, Response } from 'express';
import { CheckUserExistDto, CreateLoginDto, PushNotificationDto } from '@dtos/login.dto';
import { ILogin } from '@interfaces/login.interface';
import Loginervice from '@services/login.service';
import { stringToObjectId } from '@/utils/util';
import * as admin from 'firebase-admin';

class LoginController {
  public Loginervice = new Loginervice();

  public getLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllLoginData: ILogin[] = await this.Loginervice.findAllLogin({});

      res.status(200).json({ data: findAllLoginData, isSuccess: true, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLoginById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LoginId: string = req.params.id;
      const findOneLoginData: ILogin = await this.Loginervice.findLoginById(LoginId);

      res.status(200).json({ data: findOneLoginData, isSuccess: true, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginData: CreateLoginDto = req.body;
      const createLoginData: ILogin = await this.Loginervice.createLogin(loginData);

      res.status(201).json({ data: createLoginData, isSuccess: true, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginId: string = req.params.id;
      const loginData: CreateLoginDto = req.body;
      const updateRoleData: ILogin = await this.Loginervice.updateLogin(loginId, loginData);

      res.status(200).json({ data: updateRoleData, isSuccess: true, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LoginId: string = req.params.id;
      const deleteLoginData: ILogin = await this.Loginervice.deleteLogin(LoginId);

      res.status(200).json({ data: deleteLoginData, isSuccess: true, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateDeviceToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.body.device_token: ", req.body.device_token)
      await this.Loginervice.updateDeviceToken(req.params.id, req.body.device_token);
      res.status(200).json({ isSuccess: true, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public checkUserExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CheckUserExistDto = req.body;
      const loginData: ILogin = await this.Loginervice.checkUserExist(data);
      res.status(200).json({ data: loginData, isSuccess: true, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public sendPushNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pushNotificationData: PushNotificationDto = req.body;
      const loginData: ILogin = await this.Loginervice.findOne({ $or: [{ user: stringToObjectId(pushNotificationData.otherUserId) }, { consultant: stringToObjectId(pushNotificationData.otherUserId) }] });

      if (loginData  && loginData.device_tokens) {
        for (let index = 0; index < loginData.device_tokens.length; index++) {
          const message = {
            notification: {
              title: pushNotificationData.title,
              body: pushNotificationData.body
            },
            token: loginData.device_tokens[index]//'eM0i7fZ3QbGHooh3s1pJ0x:APA91bGQhTpPxC677mJvqWa5b_hLij23W6ZBFax8MAHGq0LBW_et_Njkc-XfQ40eyVLWe9BjFX0yif5Im3yX6O6Z5IQ4j3zuPZjXH7thAztviNPvkVkIGDYU8tBpkFcAWALJt9J5Imiq'
          };
          await admin.messaging().send(message)
            .then((response) => {
              console.log('Successfully sent message:', response);
            })
            .catch((error) => {
              console.error('Error sending message:', error);
            });
        }
      }
      return res.status(200).json({ isSuccess: true, message: 'Notification Sent' });
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
