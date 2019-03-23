const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'bot',
			memberName: 'ping',
			description: 'Replies with ping.'
		});
	}

	async run(message) {
		return message.channel.send(new RichEmbed()
			.setDescription(`⏳ ${moment().diff(moment(message.createdAt), 'milliseconds')}`)
			.setColor(message.member ? message.member.displayColor || 'WHITE' : global.BOT_DEFAULT_COLOR));
	}
};
