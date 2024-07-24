import { NextFunction, Request, Response } from 'express';
import { CreateConsultantDto } from '@dtos/consultant.dto';
import { IConsultant } from '@interfaces/consultant.interface';
import ConsultantService from '@services/consultant.service';
import LoginService from '@/services/login.service';
import RoleService from '@/services/role.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class ConsultantController {
  public consultantService = new ConsultantService();
  public loginService = new LoginService();
  public roleService = new RoleService();

  public getConsultant = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAllConsultantData: IConsultant[] = await this.consultantService.findAllConsultant({});

      res.status(200).json({ data: findAllConsultantData, isSuccess: true, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getConsultantByIds = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAllConsultantData: IConsultant[] = await this.consultantService.findAllConsultant({ $in: { id: req.body.consultantIds } });
      res.status(200).json({ data: findAllConsultantData, isSuccess: true, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getConsultantById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const consultantId: string = req.params.id;
      const findOneConsultantData: IConsultant = await this.consultantService.findConsultantById(consultantId);

      res.status(200).json({ data: findOneConsultantData, isSuccess: true, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createConsultant = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const consultantData: IConsultant = req.body;
      consultantData.company = "65e9529987ed245804e6aa83";//req.user.company;
      const createConsultantData: IConsultant = await this.consultantService.createConsultant(consultantData);
      if (createConsultantData) {
        const role = await this.roleService.findRoleByName('Consultant');
        await this.loginService.createLogin({
          name: consultantData.name,
          email: consultantData.email,
          phone_number: consultantData.phone_number,
          consultant: createConsultantData._id,
          role: role._id,
          company: null,
          password: null
        });
      }
      res.status(201).json({ data: createConsultantData, isSuccess: true, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateConsultant = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const consultantId: string = req.params.id;
      const ConsultantData: CreateConsultantDto = req.body;
      const updateConsultantData: IConsultant = await this.consultantService.updateConsultant(consultantId, ConsultantData);

      res.status(200).json({ data: updateConsultantData, isSuccess: true, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteConsultant = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const consultantId: string = req.params.id;
      const deleteConsultantData: IConsultant = await this.consultantService.deleteConsultant(consultantId);
      await this.loginService.deleteLogin({ consultant: consultantId });

      res.status(200).json({ data: deleteConsultantData, isSuccess: true, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ConsultantController;
