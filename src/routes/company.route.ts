import { Router } from 'express';
import CompanyController from '@controllers/company.controller';
import { CreateCompanyDto } from '@dtos/company.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class CompanyRoute implements Routes {
  public path = '/companies';
  public router = Router();
  public CompanyController = new CompanyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.CompanyController.getCompany);
    this.router.get(`${this.path}/:id`, this.CompanyController.getCompanyById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCompanyDto, 'body'), this.CompanyController.createCompany);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateCompanyDto, 'body', true), this.CompanyController.updateCompany);
    this.router.delete(`${this.path}/:id`, this.CompanyController.deleteCompany);
  }
}

export default CompanyRoute;
