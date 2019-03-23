const { Command }	= require('discord.js-commando');
const { RichEmbed }	= require('discord.js');
const moment		= require('moment');
const os			= require('os');
const pjson			= require('../../package.json');
const THUMBNAIL 	= 'https://cdn.discordapp.com/attachments/469111529384443904/473072301315981312/Euphie-sama.png';

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'stats',
			group: 'bot',
			memberName: 'stats',
			description: 'Returns bot stats.'
		});
	}

	async run(message) {
		return message.embed(new RichEmbed()
			.setAuthor(`Euphemia version ${pjson.version} by ${pjson.author}`, THUMBNAIL, pjson.repository.name)
			.setColor([233, 91, 169])
			.addField('⌛ Uptime', moment.duration(this.client.uptime, 'milliseconds').format('D [days] H [hours] m [minutes] s [seconds]'), false)
			.addField('📥 Received', this.client.messageStats.received, true)
			.addField('📤 Sent', this.client.messageStats.sent, true)
			.addField('📡 Commands', this.client.messageStats.commands, true)
			.addField('📙 Servers', this.client.guilds.array().length, true)
			.addField('📑 Channels', this.client.channels.array().length, true)
			.addField('📎 Users', this.client.users.array().length, true)
			.addField('🖥 OS', process.platform, true)
			.addField('💻 Version', os.release(), true)
			.addField('⚙ Node', process.version, true)
		);
	}
};
