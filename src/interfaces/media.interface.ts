import { ObjectId } from 'mongodb';

export interface IMedia {
    _id: ObjectId;
    title: string;
    type: string;
    url: string,
}
