import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { IUser } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { stringToObjectId } from '@/utils/util';
import LoginService from '@/services/login.service';
import { ILogin } from '@/interfaces/login.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import fs from 'fs';
import path from 'path';

class UsersController {
  public userService = new userService();
  public loginService = new LoginService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: IUser[] = await this.userService.findAllUser({});

      res.status(200).json({ data: findAllUsersData, isSuccess: true, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUsertByIds = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: IUser[] = await this.userService.findAllUser({ $in: { id: req.body.userIds } });
      res.status(200).json({ data: findAllUsersData, isSuccess: true, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: IUser = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, isSuccess: true, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: IUser = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, isSuccess: true, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = stringToObjectId(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: IUser = await this.userService.updateUser(userId, userData);
      const loginUser: ILogin = await this.loginService.findOne({ user: userId });
      if (loginUser != null && loginUser.isNew) {
        await this.loginService.updateLogin(loginUser._id, { isNew: false });
      }
      res.status(200).json({ data: updateUserData, isSuccess: true, message: 'User detail updated successfully!' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: IUser = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, isSuccess: true, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public uploadProfilePic = async (req: any, res: Response, next: NextFunction) => {
    try {
      console.log("ssss:, ", req.file.filename)
      const rootPath = path.resolve(process.cwd());
      const profilePath = path.join(rootPath, 'tempFiles/' + req.file.originalname);
      await fs.access(profilePath, fs.constants.F_OK, async (err) => {
        if (err) {
          return res.status(201).json({ isSuccess: false, message: 'Something is wrong!' });
        } else {
          const destinationPath = path.join(rootPath, 'uploads/' + req.body._id);
          await fs.mkdir(destinationPath, { recursive: true }, (err) => {
            if (err) {
              console.error('Error creating folder:', err);
            }
            console.log('Folder created successfully.');
          });

          const fileName = path.join(destinationPath, 'profile_' + req.body._id + path.extname(req.file.originalname));
          await fs.rename(profilePath, fileName, (err) => {
            if (err) {
              console.error('Error move:', err);
            }
            console.log('Moved successfully.');
          });
          await this.userService.updateUser(req.body._id, { profile: 'profile_' + req.body._id + path.extname(req.file.originalname) });
          return res.status(200).json({ isSuccess: true, message: 'Successfully uploaded picture!' });
        }
      });
    } catch (error) {
      next(error);
    }
  };

  public downloadProfileImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rootPath = path.resolve(process.cwd());
      const fullPath = path.join(rootPath, 'uploads/' + req.params.id);
      await fs.access(path.join(fullPath, req.params.filename), fs.constants.F_OK, (err) => {
        if (err) {
          console.error('File does not exist:', err);
          return res.status(404).send('File not found');
        }
    
        // Set the appropriate headers for file download
        res.setHeader('Content-Disposition', `attachment; filename=${req.params.filename}`);
        res.setHeader('Content-Type', 'application/octet-stream');
    
        // Create a read stream from the file and pipe it to the response
        const fileStream = fs.createReadStream(path.join(fullPath, req.params.filename));
        fileStream.pipe(res);
      });
    } catch (error) {
      next(error);
    }
  };
}




export default UsersController;
