import mongoose, { model, Schema, Document } from 'mongoose';
import { ILike } from '@/interfaces/like.interface';

const likeSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'users' },
    consultant: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'consultants' },
}, {
    timestamps: true
});

const likeModel = model<ILike & Document>('likes', likeSchema);

export default likeModel;

