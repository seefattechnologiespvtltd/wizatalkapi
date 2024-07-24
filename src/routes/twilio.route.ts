import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import TwilioController from '@/controllers/twilio.controller';
import { GetAccessTokenDto } from '@/dtos/twilio.dto';

class TwilioRoute implements Routes {
  public path = '/twilio';
  public router = Router();
  public twilioController = new TwilioController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/access-token`, validationMiddleware(GetAccessTokenDto, 'body'), this.twilioController.getTwilioAccessToken);
  }
}

export default TwilioRoute;
