import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import RoleRoute from './routes/role.route';
import CompanyRoute from './routes/company.route';
import ConsultantRoute from './routes/consultant.route';
import specialityRoute from './routes/speciality.route';
import TwilioRoute from './routes/twilio.route';
import CountryRoute from './routes/country.route';
import LoginRoute from './routes/login.route';
import FeedRoute from './routes/feed.route';
import ShortRoute from './routes/short.route';

validateEnv();

const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new RoleRoute(),
    new CompanyRoute(),
    new ConsultantRoute(),
    new specialityRoute(),
    new TwilioRoute(),
    new CountryRoute(),
    new LoginRoute(),
    new FeedRoute(),
    new ShortRoute(),
]);

app.listen();
