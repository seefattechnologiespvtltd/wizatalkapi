import mongoose, { model, Schema, Document } from 'mongoose';
import { IShare } from '@/interfaces/share.interface';

const shareSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'users' },
    consultant: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'consultants' },
}, {
    timestamps: true
});

const shareModel = model<IShare & Document>('shares', shareSchema);

export default shareModel;

