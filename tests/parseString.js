var { expect } = require('chai');
var { parseDuration } = require('../lib/parseString');

describe('parsing durations ', () => {
	[
		['1d20h20m', 1, 20, 20],
		['1d2h20m', 1, 2, 20],
		['1d20h2m', 1, 20, 2],
		['1d2h2m', 1, 2, 2],
		['1d20h', 1, 20, 0],
		['1d2h', 1, 2, 0],
		['1d20m', 1, 0, 20],
		['1d2m', 1, 0, 2],
		['1d', 1, 0, 0],
		['20h', 0, 20, 0],
		['2h', 0, 2, 0],
		['20h20m', 0, 20, 20],
		['20h2m', 0, 20, 2],
		['2h20m', 0, 2, 20],
		['2h2m', 0, 2, 2],
		['20m', 0, 0, 20],
		['2m', 0, 0, 2]
	].map(([time, days, hours, minutes]) => {
		describe(`parsing ${time}`, () => {
			it('should parse days correctly', () => {
				expect(parseDuration(time)).to.have.property('days', days);
			});

			it('should parse hours correctly', () => {
				expect(parseDuration(time)).to.have.property('hours', hours);
			});

			it('should parse minutes correctly', () => {
				expect(parseDuration(time)).to.have.property('minutes', minutes);
			});
		});
	});
});