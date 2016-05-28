let args = require('system').args;
let spawn = require("child_process").spawn;
let page = require('./lib/page');
let { worlds, character_counts } = require('./lib/constants');
let { listenForJob } = require('./lib/job');

if (!args || args[1] !== 'resume') {
	let keys = [];
	for (let i in worlds) {
		let world = worlds[i];
		for (let character_count of character_counts) {
			page.publishJob('linkshell_totalcount.js', [world, character_count]);
		}
	}
}

let spawnCount = 10;
for (let i = 1; i <= spawnCount; i++) {
	listenForJob();
}