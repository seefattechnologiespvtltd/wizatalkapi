import { ObjectId } from 'mongodb';

export interface IComment {
    _id: ObjectId;
    content: string;
    user: ObjectId;
    consultant: ObjectId;
}
