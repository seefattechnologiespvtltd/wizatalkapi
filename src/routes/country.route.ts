import { Router } from 'express';
import CountryController from '@controllers/country.controller';
import { CreateCountryDto } from '@dtos/country.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class CountryRoute implements Routes {
  public path = '/countries';
  public router = Router();
  public countryController = new CountryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.countryController.getCountry);
    this.router.get(`${this.path}/:id`, this.countryController.getCountryById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCountryDto, 'body'), this.countryController.createCountry);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateCountryDto, 'body', true), this.countryController.updateCountry);
    this.router.delete(`${this.path}/:id`, this.countryController.deleteCountry);
  }
}

export default CountryRoute;
