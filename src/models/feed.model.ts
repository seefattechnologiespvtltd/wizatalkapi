import mongoose, { model, Schema, Document } from 'mongoose';
import { IFeed } from '@/interfaces/feed.interface';

const feedSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  media: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'media' }],
  views: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'feed-views' }],
  consultant: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'consultants' },
  slideIndex: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const feedModel = model<IFeed & Document>('feeds', feedSchema);

export default feedModel;

