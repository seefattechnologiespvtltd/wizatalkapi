import { Router } from 'express';
import ConsultantController from '@controllers/consultant.controller';
import { CreateConsultantDto } from '@dtos/consultant.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class ConsultantRoute implements Routes {
  public path = '/consultants';
  public router = Router();
  public consultantController = new ConsultantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.consultantController.getConsultant);
    this.router.get(`${this.path}/:id`, authMiddleware, this.consultantController.getConsultantById);
    this.router.post(`${this.path}`, validationMiddleware(CreateConsultantDto, 'body'), this.consultantController.createConsultant);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateConsultantDto, 'body', true), this.consultantController.updateConsultant);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.consultantController.deleteConsultant);
    this.router.post(`${this.path}/getConsultantByIds`, this.consultantController.getConsultantByIds);
  }
}

export default ConsultantRoute;
