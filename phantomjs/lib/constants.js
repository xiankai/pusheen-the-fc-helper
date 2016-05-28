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
	// 'Balmung',
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
// const character_counts = [OVER_FIFTY_ONE];
const baseURL = 'http://na.finalfantasyxiv.com/lodestone/linkshell/';

const generateQuery = function(world, sort, direction, character_count, page_number) {
	var order = 0;
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

module.exports = {
	worlds: worlds,
	character_counts: character_counts,
	baseURL: baseURL,
	generateQuery: generateQuery
}