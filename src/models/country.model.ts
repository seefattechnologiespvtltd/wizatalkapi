import { ICountry } from '@/interfaces/country.interface';
import { model, Schema, Document } from 'mongoose';

const countrySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const countryModel = model<ICountry & Document>('countries', countrySchema);

export default countryModel;

