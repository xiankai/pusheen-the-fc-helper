var phantom = require('phantom');
let bot = require('../bot');
let { asyncStore } = require('../store');

const lodestoneCmds = (channel, world, chars) => {
	const lodestone = asyncStore('linkshells');

	let char = chars[0];
	let key = `members:${world}:${char}`
	lodestone
	.has(key)
	.then(exists => {
		if (exists) {
			return Promise.resolve();
		} else {
			bot.sendMessage(channel, `No linkshell data found for character ${char} on ${world}.`);
		}
	})
	.then(() => lodestone.pull(key))
	.then(linkshellData => {
		bot.sendMessage(channel, linkshellData);
	});
}

module.exports = {
	lodestoneCmds
};