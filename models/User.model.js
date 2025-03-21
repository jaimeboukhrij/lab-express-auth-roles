const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    profileImg: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
    description: { type: String, default: 'No existe descripción.' },
    role: {
      type: String,
      enum: ['STUDENT', 'DEV', 'TA', "PM"],
      default: 'STUDENT',
    }
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema)
