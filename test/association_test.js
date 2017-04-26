const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('associations', () => {
  let joe, sunny, blogPost, comment;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    sunny = new User({name: 'Sunny'});
    blogPost = new BlogPost({title: 'JS is great', content: 'Indeed it is great'});
    comment = new Comment({content: 'Congrats for great blog post'});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = sunny;

    Promise.all([joe.save(), sunny.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogPost', (done) => {
    User.findOne({name: 'Joe'})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is great');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({name:'Joe'})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats for great blog post');
        assert(user.blogPosts[0].comments[0].user.name === 'Sunny');
        done();
      });
  });
});
