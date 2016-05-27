// http://zurb.com/forrst/posts/Add_color_to_console_warn_and_console_error_outp-Go0
require('colors');
function makeColorConsole(fct, color){
  return function(){
    for (var i in arguments)
      if (arguments[i] instanceof Object)
        arguments[i] = sys.inspect(arguments[i]);
    fct(Array.prototype.join.call(arguments," ")[color]);
  };
}
console.warn = makeColorConsole(console.warn, "yellow");
console.error = makeColorConsole(console.error, "red");

const generateQuery = (world, sort, direction, character_count, page_number) => {
	let order = 0;
	switch (sort) {
		case 'name':
			switch (direction) {
				case 'asc':
					order = 1;
					break;
				case 'desc':
					order = 2;
					break;
			}
			break;
		case 'number':
			switch (direction) {
				case 'asc':
					order = 4;
					break;
				case 'desc':
					order = 3;
					break;
			}
			break;
	}

	query = '?' + ['worldname='+world,'order='+order,'page='+page_number,'character_count='+character_count,'q='].join('&');
	return query;
}

const runPhantomScript = (script, args) => {
	let spawn = require("child_process").spawn;
	let default_args = ['--load-images=false', `phantomjs/${script}`, ...args];
	let phantomjs = spawn('phantomjs', default_args);

	phantomjs.stdout.on('data', (data) => {
	  	console.log(`stdout: ${data}`);
	});

	phantomjs.stderr.on('data', (data) => {
	  	console.error(`stderr: ${data}`);
	});

	phantomjs.on('close', (code) => {
		if (code !== 0) {
		  	console.error(`child process exited with code ${code}`);
		}
	});
}

const worlds = [
	// // Elemental
	// 'Aegis',
	// 'Atomos',
	// 'Carbuncle',
	// 'Garuda',
	// 'Gungnir',
	// 'Kujata',
	// 'Ramuh',
	// 'Tonberry',
	// 'Typhon',
	// 'Unicorn',
	// // Gaia
	// 'Alexander',
	// 'Bahamut',
	// 'Durandal',
	// 'Fenrir',
	// 'Ifrit',
	// 'Ridill',
	// 'Tiamat',
	// 'Ultima',
	// 'Valefor',
	// 'Yojimbo',
	// 'Zeromus',
	// // Mana
	// 'Anima',
	// 'Asura',
	// 'Belias',
	// 'Chocobo',
	// 'Hades',
	// 'Ixion',
	// 'Mandragora',
	// 'Masamune',
	// 'Pandaemonium',
	// 'Shinryu',
	// 'Titan',
	// Aether
	// 'Adamantoise',
	'Balmung',
	// 'Cactuar',
	// 'Coeurl',
	// 'Faerie',
	// 'Gilgamesh',
	// 'Goblin',
	'Jenova',
	// 'Mateus',
	// 'Midgardsormr',
	// 'Sargatanas',
	// 'Siren',
	// 'Zalera',
	// // Primal
	// 'Behemoth',
	// 'Brynhildr',
	// 'Diabolos',
	// 'Excalibur',
	// 'Exodus',
	// 'Famfrit',
	// 'Hyperion',
	// 'Lamia',
	// 'Leviathan',
	// 'Malboro',
	// 'Ultros',
	// // Chaos
	// 'Cerberus',
	// 'Lich',
	// 'Moogle',
	// 'Odin',
	// 'Phoenix',
	// 'Ragnarok',
	// 'Shiva',
	// 'Zodiark'
];
const ONE_TO_TEN = '1-10';
const ELEVEN_TO_THIRTY = '11-30';
const THIRTY_ONE_TO_FIFTY = '31-50';
const OVER_FIFTY_ONE = '51-';
const character_counts = [ONE_TO_TEN, ELEVEN_TO_THIRTY, THIRTY_ONE_TO_FIFTY, OVER_FIFTY_ONE];
const baseURL = 'http://na.finalfantasyxiv.com/lodestone/linkshell/';
const createClient = require('then-redis').createClient;

let keys = [];
for (let world of worlds) {
	for (let character_count of character_counts) {
		keys.push([world, character_count]);
	}
}

const fetchPageCount = (world, character_count) => new Promise((resolve, reject) => {
	let key = `${world}_${character_count}`;
	let subscriber = createClient();
	subscriber.subscribe(`totalcount_${key}`);
	let url = baseURL + generateQuery(world, '', '', character_count);
	runPhantomScript('./linkshell_totalcount.js', [url, key]);
	subscriber.on('message', (channel, message) => {
		resolve({
			world,
			character_count,
			count: message
		});
		subscriber.unsubscribe();
		subscriber.quit();
	});
});

Promise.all(
	keys.map(key => fetchPageCount(...key))
).then(values => {
	let jobs = [];
	values.map(({ world, character_count, count }) => {
		let pages = Math.ceil(count / 50);
		if (pages > 20) {
			let extraPages = pages - 20;
			extraPages = extraPages > 20 ? 20 : extraPages;

			let job = Array(extraPages).fill(0).map((e,i) => ({
				world,
				character_count,
				sort: 'asc',
				page: i+1
			}));
			jobs.push(...job);

			pages = 20;
		}

		let job = Array(pages).fill(0).map((e,i) => ({
			world,
			character_count,
			sort: 'desc',
			page: i+1
		}));
		jobs.push(...job);
	});
}).catch(err => {
	console.error(err)
});

// [x] list of worlds
// [x] foreach world
// [x] foreach endpoint (character_count)
// [x] get pagecount
// [x] parse into page numbers and list of crawlers jobs
// [] run crawler jobs
// [] parse linkshell ids and list jobs
// [] crawl them linkshells
// [] done???