import { ObjectId } from 'mongodb';

export interface IFeed {
    _id: ObjectId;
    title: string;
    description: string;
    media: ObjectId[],
    views: ObjectId[],
    consultant: ObjectId,
    slideIndex: number
}
