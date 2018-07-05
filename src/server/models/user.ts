import db from '../db';
const Scheme = db.Schema;
import * as uniqueValidator from 'mongoose-unique-validator';
// import crypto from 'crypto';

const userSchema = new Scheme(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, 'cannot be blank'],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
      unique: true,
    },
    password: String,
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

// userSchema.methods.setPassword = password => {
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// userSchema.methods.validPassword = password => {
//   const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//   return this.hash === hash;
// };

export default db.model('User', userSchema);
