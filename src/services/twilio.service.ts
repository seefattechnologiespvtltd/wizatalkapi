import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateSendOTPDto, CreateUserDto, CreateVerifyOTPDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import loginModel from '@/models/login.model';
import { ILogin } from '@/interfaces/login.interface';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID, TWILIO_CHAT_SERVICE_SID } from '@config';
import userModel from '@/models/users.model';
import roleModel from '@/models/role.model';
import AccessToken, { ChatGrant } from 'twilio/lib/jwt/AccessToken';
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

class TwilioService {
    public loginModel = loginModel;
    public userModel = userModel;
    public roleModel = roleModel;

    public async getTwilioAccessToken(loginId: string, identity: string): Promise<string> {
        if (isEmpty(identity)) throw new HttpException(400, 'Identity is empty');

        let findUser: ILogin = await this.loginModel.findOne({ _id: loginId });
        if (!findUser) throw new HttpException(400, 'User is not found');

        const token = new AccessToken(
            TWILIO_ACCOUNT_SID,
            TWILIO_AUTH_TOKEN,
            VERIFICATION_SID,
            {
                identity: identity
            }
        );

        await token.addGrant(
            new ChatGrant({
                serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
            }),
        );

        const accessToken = token.toJwt();

        await loginModel.findByIdAndUpdate({ _id: findUser._id }, { twilio_accessToken: accessToken }, { new: true });

        return accessToken;
    }
}

export default TwilioService;
