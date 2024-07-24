import { ObjectId } from 'mongodb';

export interface ILike {
    _id: ObjectId;
    user: ObjectId;
    consultant: ObjectId;
}
