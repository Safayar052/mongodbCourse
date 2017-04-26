const assert = require('assert');
const User = require('../src/user');

describe('Reading users out from the database', () => {
	let sunny, maria, alex, zach;

	beforeEach((done) => {
		alex = new User({name: 'Alex'});
		maria = new User({name: 'Maria'});
		sunny = new User({name: 'Sunny'});  // already has _id property
		zach = new User({name: 'Zach'});

		Promise.all([alex.save(), sunny.save(), zach.save(), maria.save()])
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
				done();
			});
	});

	it('can skip and limit the result set', (done) => {
		// Alex [Maria Sunny] Zach
		User.find({})
			.sort({ name: 1 })
		  .skip(1)
			.limit(2)
			.then((users) => {
				assert(users.length === 2);
				assert(users[0].name === 'Maria');
				assert(users[1].name === 'Sunny');
				done();
			});
	});

});
