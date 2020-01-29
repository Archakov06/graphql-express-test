import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
  },
  { timestamps: true },
);

export default mongoose.model('User', UserSchema);
