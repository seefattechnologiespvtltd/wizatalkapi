import { model, Schema, Document } from 'mongoose';
import { ICompany } from '@/interfaces/company.interface';

const companySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

const companyModel = model<ICompany & Document>('companies', companySchema);

export default companyModel;

