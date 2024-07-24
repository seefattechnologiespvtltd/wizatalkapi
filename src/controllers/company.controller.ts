import { NextFunction, Request, Response } from 'express';
import { CreateCompanyDto } from '@dtos/company.dto';
import { ICompany } from '@interfaces/company.interface';
import CompanyService from '@services/company.service';
import LoginService from '@/services/login.service';
import RoleService from '@/services/role.service';

class CompanyController {
  public companyService = new CompanyService();
  public loginService = new LoginService();
  public roleService = new RoleService();

  public getCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCompanyData: ICompany[] = await this.companyService.findAllCompany();

      res.status(200).json({ data: findAllCompanyData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CompanyId: string = req.params.id;
      const findOneCompanyData: ICompany = await this.companyService.findCompanyById(CompanyId);

      res.status(200).json({ data: findOneCompanyData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CompanyData: ICompany = req.body;
      const createCompanyData: ICompany = await this.companyService.createCompany(CompanyData);
      if (createCompanyData) {
        const role = await this.roleService.findRoleByName('Admin');
        await this.loginService.createLogin({
          name: CompanyData.name,
          email: CompanyData.email,
          phone_number: CompanyData.phone_number,
          password: CompanyData.password,
          company: createCompanyData._id,
          role: role._id,
          consultant: null
        });
      }
      res.status(201).json({ data: createCompanyData, isSuccess: true, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CompanyId: string = req.params.id;
      const CompanyData: CreateCompanyDto = req.body;
      const updateCompanyData: ICompany = await this.companyService.updateCompany(CompanyId, CompanyData);

      res.status(200).json({ data: updateCompanyData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CompanyId: string = req.params.id;
      const deleteCompanyData: ICompany = await this.companyService.deleteCompany(CompanyId);

      res.status(200).json({ data: deleteCompanyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CompanyController;
