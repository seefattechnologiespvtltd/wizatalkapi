import mongoose, { model, Schema, Document } from 'mongoose';
import { IUser } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'specialties' }],
  countries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'countries' }],
});

const userModel = model<IUser & Document>('users', userSchema);

export default userModel;
