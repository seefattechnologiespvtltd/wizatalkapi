import mongoose, { model, Schema, Document } from 'mongoose';
import { IShort } from '@/interfaces/short.interface';

const ShortSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  media: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'media' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'likes' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'comments' }],
  shares: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'shares' }],
  hashtags: [{
    type: String,
  }],
  consultant: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'consultants' },
}, {
  timestamps: true
});

const ShortModel = model<IShort & Document>('Shorts', ShortSchema);

export default ShortModel;

