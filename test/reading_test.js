const assert = require('assert');
const User = require('../src/user');

describe('Reading users out from the database', () => {
	let sunny;
	beforeEach((done) => {
		sunny = new User({name: 'Sunny'});  // already has _id property
		sunny.save()
			.then(() => done());
	});

	it('find all the users with name Sunny', (done) => {
		User.find({name: 'Sunny'})
			.then((users) => {
				assert(users[0]._id.toString() === sunny._id.toString());
				done();
			});
	});

	it('find a user with a particular id', (done) => {
		User.findOne({ _id: sunny._id })
			.then((user) => {
				assert(user.name === 'Sunny');
				// test git
				done();
			});
	});
});
