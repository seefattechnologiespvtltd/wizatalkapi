import { Router } from 'express';
import FeedController from '@controllers/feed.controller';
import { CreateFeedDto } from '@dtos/feed.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class FeedRoute implements Routes {
  public path = '/feeds';
  public router = Router();
  public feedController = new FeedController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.feedController.getFeed);
    this.router.get(`${this.path}/:id`, this.feedController.getFeedById);
    this.router.post(`${this.path}`, validationMiddleware(CreateFeedDto, 'body'), this.feedController.createFeed);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateFeedDto, 'body', true), this.feedController.updateFeed);
    this.router.delete(`${this.path}/:id`, this.feedController.deleteFeed);
  }
}

export default FeedRoute;
