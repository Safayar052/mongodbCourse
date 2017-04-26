const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
	it('saves a user', (done) => {
		const sunny = new User({name: 'Sunny'});
		sunny.save()
			.then(() => {
				// Has sunny saved to MongoDb successfully?
				assert(!sunny.isNew);
				done();
			});
	})
});