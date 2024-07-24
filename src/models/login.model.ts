import mongoose, { model, Schema, Document } from 'mongoose';
import { ILogin } from '@/interfaces/login.interface';

const loginSchema: Schema = new Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'companies' },
  consultant: { type: mongoose.Schema.Types.ObjectId, ref: 'consultants' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  password: {
    type: String,
  },
  isNew: {
    type: Boolean,
    default: false
  },
  device_tokens: [{
    type: String,
  }],
  tokens: [
    {
      type: String,
    },
  ],
}, {
  timestamps: true
});

const loginModel = model<ILogin & Document>('logins', loginSchema);

export default loginModel;

