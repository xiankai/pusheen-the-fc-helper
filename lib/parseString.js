"use strict";

const parseDuration = string => {
	let matches = /^(([0-9])d)?(([0-9]|1[0-9]|2[0-3])h)?(([0-5][0-9]|[0-9])m)?$/.exec(string);
	return {
		days: parseInt(matches[2]) || 0,
		hours: parseInt(matches[4]) || 0,
		minutes: parseInt(matches[6]) || 0
	}
}

module.exports = {
	parseDuration
};