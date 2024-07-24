import { NextFunction, Request, Response } from 'express';
import { CreateRoleDto } from '@dtos/role.dto';
import { IRole } from '@interfaces/role.interface';
import roleService from '@services/role.service';

class RoleController {
  public roleService = new roleService();

  public getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRoleData: IRole[] = await this.roleService.findAllRole();

      res.status(200).json({ data: findAllRoleData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: IRole = await this.roleService.findRoleById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateRoleDto = req.body;
      const createUserData: IRole = await this.roleService.createRole(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateRoleDto = req.body;
      const updateUserData: IRole = await this.roleService.updateRole(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: IRole = await this.roleService.deleteRole(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RoleController;
