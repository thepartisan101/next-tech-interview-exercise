const subject = require('../lib/fetch');

describe('Testing the Fetch Library', () => {

	const testUrls = [
		"http://example.com/",
		"http://example.org/"
	]

	it('resolves an array of urls', async () => {
		const response = await (subject(testUrls))
		expect(response[0]).toMatch("Example Domain");
		expect(response[1]).toMatch("Example Domain");
	});

});
