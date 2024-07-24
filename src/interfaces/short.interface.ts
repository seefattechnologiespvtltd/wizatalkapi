import { ObjectId } from 'mongodb';

export interface IShort {
    _id: ObjectId;
    title: string;
    description: string;
    media: ObjectId[],
    views: ObjectId[],
    consultant: ObjectId,
    slideIndex: number
}
