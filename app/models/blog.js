import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    title: { type: String, required: true },
    text: {
      type: Map,
      of: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

BlogSchema.virtual('user', {
  ref: 'user',
  localField: '_id',
  foreignField: 'author',
});

export const BlogModel = mongoose.model('blog', BlogSchema);
