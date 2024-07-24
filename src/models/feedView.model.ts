import mongoose, { model, Schema, Document } from 'mongoose';
import { IFeedview } from '@/interfaces/feedView.interface';

const feedViewSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'users' },
    consultant: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'consultants' },
}, {
    timestamps: true
});

const feedViewModel = model<IFeedview & Document>('feed-views', feedViewSchema);

export default feedViewModel;

