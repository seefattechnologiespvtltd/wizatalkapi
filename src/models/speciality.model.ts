import { ISpeciality } from '@/interfaces/speciality.interface';
import { model, Schema, Document } from 'mongoose';

const specialitySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const specialityModel = model<ISpeciality & Document>('specialties', specialitySchema);

export default specialityModel;

