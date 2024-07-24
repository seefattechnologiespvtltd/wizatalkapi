import { NextFunction, Request, Response } from 'express';
import TwilioService from '@/services/twilio.service';
import LoginService from '@/services/login.service';
import { ILogin } from '@/interfaces/login.interface';

class TwilioController {
  public loginService = new LoginService();
  public twilioService = new TwilioService();

  public getTwilioAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginData: ILogin = await this.loginService.findLoginById(req.body._id);
      if(loginData !=null && loginData.twilio_accessToken !=null){
         return res.status(200).json({ data: loginData.twilio_accessToken, message: 'Access Token' });
      }
      const accessToken: string = await this.twilioService.getTwilioAccessToken(req.body._id, req.body.identity);
      console.log('AAAccessToken: ', accessToken)
      res.status(200).json({ data: accessToken, message: 'Access Token' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  };

}

export default TwilioController;
