const { model, Schema } = require('mongoose');
const { fileSchema } = require('./File');

const artSchema = new Schema({
  title: String,
  details: String,
  category: String,
  tags: [String],
  createdAt: String,
  publishedAt: String,
  img: fileSchema,
  user: {
    id: { type: Schema.Types.ObjectId, ref: 'users' },
    username: String,
    img: fileSchema
  },
  comments: [
    {
        text: String,
        createdAt: String,
        user: {
          id: { type: Schema.Types.ObjectId, ref: 'users' },
          username: String,
          img: fileSchema
        }
    }
  ],
  likes: [
    {
        createdAt: String,
        userId: { type: Schema.Types.ObjectId, ref: 'users' }
    }
  ]
});

export default model('Art', artSchema);