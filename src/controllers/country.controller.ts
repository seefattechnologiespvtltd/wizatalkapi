import { NextFunction, Request, Response } from 'express';
import { CreateCountryDto } from '@dtos/country.dto';
import { ICountry } from '@interfaces/country.interface';
import CountryService from '@services/country.service';

class CountryController {
  public CountryService = new CountryService();

  public getCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCountryData: ICountry[] = await this.CountryService.findAllCountry();

      res.status(200).json({ data: findAllCountryData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCountryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const countryId: string = req.params.id;
      const findOneCountryData: ICountry = await this.CountryService.findCountryById(countryId);

      res.status(200).json({ data: findOneCountryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const countryData: CreateCountryDto = req.body;
      const createCountryData: ICountry = await this.CountryService.createCountry(countryData);

      res.status(201).json({ data: createCountryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const countryId: string = req.params.id;
      const countryData: CreateCountryDto = req.body;
      const updateCountryData: ICountry = await this.CountryService.updateCountry(countryId, countryData);

      res.status(200).json({ data: updateCountryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteCountryData: ICountry = await this.CountryService.deleteCountry(req.params.id);

      res.status(200).json({ data: deleteCountryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CountryController;
