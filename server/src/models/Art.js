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
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  comments: [
    {
        text: String,
        createdAt: String,
        userId: { type: Schema.Types.ObjectId, ref: 'users' }
    }
  ],
  likes: [
    {
        createdAt: String,
        userId: { type: Schema.Types.ObjectId, ref: 'users' }
    }
  ]
});

module.exports = model('Art', artSchema);