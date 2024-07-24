import { Router } from 'express';
import ShortController from '@controllers/short.controller';
import { CreateShortDto } from '@dtos/short.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ShortRoute implements Routes {
    public path = '/shorts';
    public router = Router();
    public ShortController = new ShortController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.ShortController.getShort);
        this.router.get(`${this.path}/:id`, this.ShortController.getShortById);
        this.router.post(`${this.path}`, validationMiddleware(CreateShortDto, 'body'), this.ShortController.createShort);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateShortDto, 'body', true), this.ShortController.updateShort);
        this.router.delete(`${this.path}/:id`, this.ShortController.deleteShort);
    }
}

export default ShortRoute;
