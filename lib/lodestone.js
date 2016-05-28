let S = require('string');
let bot = require('../bot');
let { asyncStore } = require('../store');
let { baseURL } = require('../phantomjs/lib/constants');

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
	.then(linkshellData => Promise.all(
		linkshellData.map(str => {
			let [linkshellId, rank] = str.split(':');
			switch (rank) {
				case 'master':
					rank = `(:star2: Master)`
					break;
				case 'master':
					rank = `(:star: Leader)`
					break;
				default:
					rank = `(Member)`
					break;
			}

			return lodestone.access(`linkshells:${linkshellId}`)
			.then(linkshellData => {
				let [name, qty] = linkshellData.split(':');
				return Promise.resolve({
					name,
					url: baseURL + linkshellId,
					rank,
					qty
				})
			});
		})
	)).then(linkshellInfo => {
		bot.sendMessage(channel, `
${char} | ${world}
Linkshells
${linkshellInfo.map(({ name, url, rank, qty }) => {
	return `${url} ${S(qty).padRight(3).s} members ${S(name).padRight(0).s} ${rank}\n`
})}
		`);
	});
}

module.exports = {
	lodestoneCmds
};