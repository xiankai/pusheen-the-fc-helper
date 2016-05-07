"use strict";

let moment = require('moment');
let bot = require('../bot');
let { asyncStore } = require('../store');
let { parseDuration } = require('./parseString');

const airshipCmds = (channel, cmd, identifier, params) => {
	const airships = asyncStore('airships');

	if (cmd === 'register') {
		airships
		.has(identifier)
		.then(exists => {
			if (exists) {
				bot.sendMessage(channel, `Airship ${identifier} is already registered nyaaan! Use !airships reset ${identifier} to reset eet.`);
			} else {
				airships.set(identifier, {
					timer: moment().format('NNN d, yyyy hh:mm:ss a')
				});
				bot.sendMessage(channel, `Airship ${identifier} is now registered.`);
			};
		});
	} else {
		airships
		.has(identifier)
		.then(exists => {
			if (!exists) {
				bot.sendMessage(channel, `Airship ${identifier} is not registered yet nyaaan! Use !airships register ${identifier} to add eet to your fleet.`);
			} else {
				switch(cmd) {
					case 'launch':
						let { days, hours, minutes } = parseDuration(params);
						let date = moment()
							.add(days, 'days')
							.add(hours, 'hours')
							.add(minutes, 'minutes');
						airships.update(identifier, {
							timer: date.format('NNN d, yyyy hh:mm:ss a')
						});
						bot.sendMessage(channel, `Airship ${identifier} has been sent on a voyage. It will return at ${date.format('DD/MM ddd HH:mm')}`);
						setTimeout(() => {
							bot.sendMessage(channel, `Airship ${identifier} has returned from its voyage!`);
						}, (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000);
						break;
				}
			}
		});
	}
}

module.exports = {
	airshipCmds
};