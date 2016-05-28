let spawn = require("child_process").spawn;
let page = require('./lib/page');
let { worlds, character_counts } = require('./lib/constants');
let { listenForJob } = require('./lib/job');

let keys = [];
for (let i in worlds) {
	let world = worlds[i];
	for (let character_count of character_counts) {
		page.publishJob('linkshell_totalcount.js', [world, character_count]);
	}
}

let spawnCount = 10;
for (let i = 1; i <= spawnCount; i++) {
	listenForJob();
}

// [x] list of worlds
// [x] foreach world
// [x] foreach endpoint (character_count)
// [x] get pagecount
// [x] parse into page numbers and list of crawlers jobs
// [] run crawler jobs
// [] parse linkshell ids and list jobs
// [] crawl them linkshells
// [] done???
// 
// spawn 10 workers in advance
// they will look at list and use crawl linkshell script
// when script ends they will add to the list with linkshell member jobs
// a listener will subscribe to the list - when the list is empty, it will say done.