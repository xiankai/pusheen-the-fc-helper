"use strict";

const parseDuration = string => {
	let matches = /^(([0-9])d)?(([0-9][0-9]|[0-9])h)?(([0-5][0-9]|[0-9])m)?$/.exec(string);
	let hours = parseInt(matches[4]) || 0; 
	return {
		days: parseInt(matches[2]) || 0 + Math.floor(hours/24),
		hours: hours % 24,
		minutes: parseInt(matches[6]) || 0
	}
}

module.exports = {
	parseDuration
};