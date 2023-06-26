const { default: mongoose } = require('mongoose');

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

module.exports = {
  UserModel: mongoose.model('user', UserSchema),
};
