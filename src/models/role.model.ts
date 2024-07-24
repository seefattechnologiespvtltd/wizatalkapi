import { IRole } from '@/interfaces/role.interface';
import { model, Schema, Document } from 'mongoose';

const roleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const roleModel = model<IRole & Document>('roles', roleSchema);

export default roleModel;

