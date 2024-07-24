import { ObjectId } from 'mongodb';

export interface IShare {
    _id: ObjectId;
    user: ObjectId;
    consultant: ObjectId;
}
