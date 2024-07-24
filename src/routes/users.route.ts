import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
    this.router.post(`${this.path}/getUsertByIds`, this.usersController.getUsertByIds);
    this.router.post(`${this.path}/upload`, upload.single('profile'), this.usersController.uploadProfilePic);
    this.router.get(`${this.path}/profile/:id/:filename`, this.usersController.downloadProfileImage);
  }
}

// Multer configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, 'tempFiles/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original file name
  }
});
const upload = multer({ storage: storage });

export default UsersRoute;
