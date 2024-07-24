import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import ShortModel from '@/models/short.model';
import { IShort } from '@/interfaces/short.interface';
import { CreateShortDto } from '@/dtos/short.dto';
import mediaModel from '@/models/media.model';
import likeModel from '@/models/like.model';
import commentModel from '@/models/comment.model';
import shareModel from '@/models/share.model';

class ShortService {
  public ShortModel = ShortModel;
  public likeModel = likeModel;
  public commentModel = commentModel;
  public shareModel = shareModel;

  public async findAllShort(): Promise<IShort[]> {
    const shorts: IShort[] = await this.ShortModel.find().populate('media').populate('likes').populate('comments').populate('shares').populate([
      { 
        path: 'consultant', 
        populate: [{ path: 'company' }] 
      }
    ]);
    return shorts;
  }

  public async findShortById(shortId: string): Promise<IShort> {
    if (isEmpty(shortId)) throw new HttpException(400, 'ShortId is empty');

    const findShort: IShort = await this.ShortModel.findOne({ _id: shortId }).populate('media').populate('likes').populate('comments').populate('shares').populate([
      { 
        path: 'consultant', 
        populate: [{ path: 'company' }] 
      }
    ]);
    if (!findShort) throw new HttpException(409, "Short doesn't exist");

    return findShort;
  }

  public async createShort(shortData: CreateShortDto): Promise<IShort> {
    if (isEmpty(shortData)) throw new HttpException(400, 'ShortData is empty');

    const createShortData: IShort = await this.ShortModel.create({ ...shortData });

    return createShortData;
  }

  public async updateShort(shortId: string, shortData: CreateShortDto): Promise<IShort> {
    if (isEmpty(shortData)) throw new HttpException(400, 'ShortData is empty');

    const updateShortById: IShort = await this.ShortModel.findByIdAndUpdate(shortId, { shortData });
    if (!updateShortById) throw new HttpException(409, "Short doesn't exist");

    return updateShortById;
  }

  public async deleteShort(shortId: string): Promise<IShort> {
    const deleteShortById: IShort = await this.ShortModel.findByIdAndDelete(shortId);
    if (!deleteShortById) throw new HttpException(409, "Short doesn't exist");

    return deleteShortById;
  } 
}

export default ShortService;
