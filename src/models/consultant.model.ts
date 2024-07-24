import mongoose, { model, Schema, Document } from 'mongoose';
import { IConsultant } from '@/interfaces/consultant.interface';

const consultantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  company: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'companies' },
  specialties: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'specialties' }],
  languages: [{
    type: String,
    required: true,
  }],
  about: {
    type: String,
  },
  experience: {
    type: String,
  }
}, {
  timestamps: true
});

const consultantModel = model<IConsultant & Document>('consultants', consultantSchema);

export default consultantModel;

