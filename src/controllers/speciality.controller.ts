import { NextFunction, Request, Response } from 'express';
import { CreateSpecialityDto } from '@dtos/speciality.dto';
import { ISpeciality } from '@interfaces/speciality.interface';
import specialityService from '@services/speciality.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class specialityController {
  public specialityService = new specialityService();

  public getspeciality = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAllspecialityData: ISpeciality[] = await this.specialityService.findAllspeciality();

      res.status(200).json({ data: findAllspecialityData, isSuccess: true, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getspecialityById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: ISpeciality = await this.specialityService.findspecialityById(userId);

      res.status(200).json({ data: findOneUserData, isSuccess: true, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createspeciality = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: CreateSpecialityDto = req.body;
      const createUserData: ISpeciality = await this.specialityService.createspeciality(userData);

      res.status(201).json({ data: createUserData, isSuccess: true, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatespeciality = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateSpecialityDto = req.body;
      const updateUserData: ISpeciality = await this.specialityService.updatespeciality(userId, userData);

      res.status(200).json({ data: updateUserData, isSuccess: true, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletespeciality = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: ISpeciality = await this.specialityService.deletespeciality(userId);

      res.status(200).json({ data: deleteUserData, isSuccess: true, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default specialityController;
