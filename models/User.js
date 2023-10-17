const { Schema, model } = require('mongoose');
import { isEmail } from 'validator';

const userSchema = new Schema(
    {
        username: { type: String, unique: true, required: 'Username is required', trim: true },
        //note the square brackets might not work, and may need to be changed on errors in testing
        email: { type: String, required: 'Email address is required', unique: true, validate: [isEmail, 'invalid email'] },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    //virtuals go here
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
  .virtual('friendsCount')
  // Getter
  .get(function () {
    return this.friends.length
  });

const User = model('User', userSchema);

module.exports = User;