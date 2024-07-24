import { Router } from 'express';
import RoleController from '@controllers/role.controller';
import { CreateRoleDto } from '@dtos/role.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class RoleRoute implements Routes {
  public path = '/roles';
  public router = Router();
  public RoleController = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.RoleController.getRole);
    this.router.get(`${this.path}/:id`, this.RoleController.getRoleById);
    this.router.post(`${this.path}`, validationMiddleware(CreateRoleDto, 'body'), this.RoleController.createRole);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateRoleDto, 'body', true), this.RoleController.updateRole);
    this.router.delete(`${this.path}/:id`, this.RoleController.deleteRole);
  }
}

export default RoleRoute;
