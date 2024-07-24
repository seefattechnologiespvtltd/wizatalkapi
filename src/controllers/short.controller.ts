import { NextFunction, Request, Response } from 'express';
import { CreateShortDto } from '@dtos/short.dto';
import { IShort } from '@interfaces/short.interface';
import ShortService from '@services/short.service';

class ShortController {
  public ShortService = new ShortService();

  public getShort = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllShortData: IShort[] = await this.ShortService.findAllShort();

      res.status(200).json({ data: findAllShortData, isSuccess: true, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getShortById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findOneUserData: IShort = await this.ShortService.findShortById(req.params.id);

      res.status(200).json({ data: findOneUserData, isSuccess: true, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createShort = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shortData: CreateShortDto = req.body;
      const createShortData: IShort = await this.ShortService.createShort(shortData);

      res.status(201).json({ data: createShortData, isSuccess: true, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateShort = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shortData: CreateShortDto = req.body;
      const updateShortData: IShort = await this.ShortService.updateShort(req.params.id, shortData);

      res.status(200).json({ data: updateShortData, isSuccess: true, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteShort = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteShortData: IShort = await this.ShortService.deleteShort(req.params.id);

      res.status(200).json({ data: deleteShortData, isSuccess: true, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ShortController;
