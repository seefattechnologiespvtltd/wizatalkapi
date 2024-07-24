import { Router } from 'express';
import specialityController from '@controllers/speciality.controller';
import { CreateSpecialityDto } from '@dtos/speciality.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class specialityRoute implements Routes {
    public path = '/categories';
    public router = Router();
    public specialityController = new specialityController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.specialityController.getspeciality);
        this.router.get(`${this.path}/:id`, authMiddleware, this.specialityController.getspecialityById);
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateSpecialityDto, 'body'), this.specialityController.createspeciality);
        this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateSpecialityDto, 'body', true), this.specialityController.updatespeciality);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.specialityController.deletespeciality);
    }
}

export default specialityRoute;
