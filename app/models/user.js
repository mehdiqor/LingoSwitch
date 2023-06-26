import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    token: { type: String },
    tokenExpiration: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
UserSchema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text',
});

export const UserModel = mongoose.model('user', UserSchema);
