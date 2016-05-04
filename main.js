"use strict";

let S = require('string');
let bot = require('./bot');
let { airshipCmds } = require('./lib/airships');

const airships = {};

bot.on("message", message => {
	let { channel, content } = message;
	let cmd = '!airships';
	if (S(content).startsWith(cmd)) {
		let args = content.substr(cmd.length + 1);
		let [subcmd, identifier, ...params] = args.split(' ');

		airshipCmds(channel, subcmd, identifier, params);
	}
});