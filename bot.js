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

module.exports = bot;