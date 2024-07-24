import { NextFunction, Request, Response } from 'express';
import { CreateFeedDto } from '@dtos/feed.dto';
import { IFeed } from '@interfaces/feed.interface';
import FeedService from '@services/feed.service';

class FeedController {
  public feedService = new FeedService();

  public getFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllFeedData: IFeed[] = await this.feedService.findAllFeed();

      res.status(200).json({ data: findAllFeedData, isSuccess: true, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getFeedById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findOneUserData: IFeed = await this.feedService.findFeedById(req.params.id);

      res.status(200).json({ data: findOneUserData, isSuccess: true, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feedData: CreateFeedDto = req.body;
      const createFeedData: IFeed = await this.feedService.createFeed(feedData);

      res.status(201).json({ data: createFeedData, isSuccess: true, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feedData: CreateFeedDto = req.body;
      const updateFeedData: IFeed = await this.feedService.updateFeed(req.params.id, feedData);

      res.status(200).json({ data: updateFeedData, isSuccess: true, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteFeedData: IFeed = await this.feedService.deleteFeed(req.params.id);

      res.status(200).json({ data: deleteFeedData, isSuccess: true, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default FeedController;
