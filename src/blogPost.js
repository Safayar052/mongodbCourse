const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
});

BlogPostSchema.pre('remove', function(next) {
  const Comment = mongoose.model('comment');
  Comment.remove( { _id: { $in: this.comments } })
    .then(() => next());
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
