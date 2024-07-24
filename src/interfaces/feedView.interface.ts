import { ObjectId } from 'mongodb';

export interface IFeedview {
    _id: ObjectId;
    user: ObjectId;
    consultant: ObjectId;
}
