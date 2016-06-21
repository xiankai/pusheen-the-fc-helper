"use strict";

let Discord = require('discord.js');
let { token } = require('./credentials.json');

const bot = new Discord.Client();

bot.on('ready', () => {
	console.log('hi');
});

bot.loginWithToken(token, () => {
	console.log('logged in!');
});

bot.on('disconnected', () => {
	let date = new Date();
	console.log('disconnected for whatever reason at ' + date.toString());
	bot.loginWithToken(token, () => {
		console.log('logged in again!');
	});	
});

bot.on('warn', error => {
	let date = new Date();
	console.log('warning encountered at ' + date.toString());
	console.log('warning object is ', error);
});

bot.on('error', error => {
	let date = new Date();
	console.log('error encountered at ' + date.toString());
	console.log('error object is ', error);
});

module.exports = bot;