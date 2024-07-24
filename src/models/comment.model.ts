import mongoose, { model, Schema, Document } from 'mongoose';
import { IComment } from '@/interfaces/comment.interface';

const commentSchema: Schema = new Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'users' },
    consultant: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'consultants' },
}, {
    timestamps: true
});

const commentModel = model<IComment & Document>('comments', commentSchema);

export default commentModel;

