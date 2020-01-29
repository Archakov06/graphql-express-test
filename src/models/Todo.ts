import mongoose, { Schema } from 'mongoose';

const TodoSchema = new Schema(
  {
    text: String,
    user: String,
    completed: Boolean,
  },
  { timestamps: true },
);

export default mongoose.model('Todo', TodoSchema);
