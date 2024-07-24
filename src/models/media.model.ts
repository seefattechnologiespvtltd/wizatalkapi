import  { model, Schema, Document } from 'mongoose';
import { IMedia } from '@/interfaces/media.interface';

const mediaSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const mediaModel = model<IMedia & Document>('media', mediaSchema);

export default mediaModel;

