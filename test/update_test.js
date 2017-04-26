const assert = require('assert');
const User = require('../src/user');

describe('updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({
      name: 'Joe',
      likes: 0
    });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set n save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('a model instance can update', (done) => {
    assertName(joe.update({
      name: 'Alex'
    }), done);
  });

  it('class update', (done) => {
    assertName(
      User.update({
        name: 'Joe'
      }, {
        name: 'Alex'
      }),
      done
    );
  });

  it('class findOneAndUpdate', (done) => {
    assertName(
      User.findOneAndUpdate({
        name: 'Joe'
      }, {
        name: 'Alex'
      }),
      done
    );
  });

  it('class findByIdAndUpdate', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, {
        name: 'Alex'
      }),
      done
    );
  });

  it('user likes incremented by 1', (done) => {
    User.update({
        name: 'Joe'
      }, {
        $inc: {
          likes: 1
        }
      })
      .then(() => User.findOne({
        name: 'Joe'
      }))
      .then((user) => {
        assert((user.likes - joe.postCount) === 1);
        done();
      });
  });
});
