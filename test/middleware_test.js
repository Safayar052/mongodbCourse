const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('middlware', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is great', content: 'Indeed it is great'});
    comment = new Comment({content: 'Congrats for great blog post'});

    joe.blogPosts.push(blogPost);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then( () => BlogPost.count())
      .then( (count) => {
        assert(count === 0);
        done();
      });
  });
});
