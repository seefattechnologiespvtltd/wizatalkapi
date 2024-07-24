import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import FeedModel from '@/models/feed.model';
import { IFeed } from '@/interfaces/feed.interface';
import { CreateFeedDto } from '@/dtos/feed.dto';
import mediaModel from '@/models/media.model';
import feedViewModel from '@/models/feedView.model';

class FeedService {
  public feedModel = FeedModel;
  public mediaModel = mediaModel;
  public feedViewModel = feedViewModel;

  public async findAllFeed(): Promise<IFeed[]> {
    const feeds: IFeed[] = await this.feedModel.find().populate('media').populate('views').populate([
      { 
        path: 'consultant', 
        populate: [{ path: 'company' }] 
      }
    ]);
    return feeds;
  }

  public async findFeedById(feedId: string): Promise<IFeed> {
    if (isEmpty(feedId)) throw new HttpException(400, 'FeedId is empty');

    const findFeed: IFeed = await this.feedModel.findOne({ _id: feedId }).populate('media').populate('views').populate([
      { 
        path: 'consultant', 
        populate: [{ path: 'company' }] 
      }
    ]);
    if (!findFeed) throw new HttpException(409, "Feed doesn't exist");

    return findFeed;
  }

  public async createFeed(feedData: CreateFeedDto): Promise<IFeed> {
    if (isEmpty(feedData)) throw new HttpException(400, 'FeedData is empty');

    const createFeedData: IFeed = await this.feedModel.create({ ...feedData });

    return createFeedData;
  }

  public async updateFeed(feedId: string, feedData: CreateFeedDto): Promise<IFeed> {
    if (isEmpty(feedData)) throw new HttpException(400, 'FeedData is empty');

    const updateFeedById: IFeed = await this.feedModel.findByIdAndUpdate(feedId, { feedData });
    if (!updateFeedById) throw new HttpException(409, "Feed doesn't exist");

    return updateFeedById;
  }

  public async deleteFeed(feedId: string): Promise<IFeed> {
    const deleteFeedById: IFeed = await this.feedModel.findByIdAndDelete(feedId);
    if (!deleteFeedById) throw new HttpException(409, "Feed doesn't exist");

    return deleteFeedById;
  } 
}

export default FeedService;
