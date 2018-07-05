
import db from '../db';
const Scheme = db.Schema;

const todoScheme = new Scheme({
  title: {
    type: String,
    required: true,
    maxLength: 256,
  },
  time: {
    type: String,
    required: true,
    default: Date.now,
  },
  bg: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 7,
  },
}, {
  versionKey: false,
  timestamps: true,
});


export default db.model('Todo', todoScheme);
