const eventModules = [];
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(file => {
        if (file === 'event.js' || file === 'bot') {
            return;
        }
        eventModules.push(file.replace(/\.[^/.]+$/, ""));
    });
const { Command }	= require('discord.js-commando');
const { RichEmbed }	= require('discord.js');
const path			= require('path');
const fs			= require('fs');
const directoryPath	= path.join(__dirname + '/../../events');
});

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'log',
            group: 'setup',
            memberName: 'log',
            description: 'Binds log events to channels',
            userPermissions: ['MANAGE_GUILD'],
            examples: [`${client.commandPrefix}log list`, `${client.commandPrefix}log enable event #channel`],
            guildOnly: true
        });
    };

    async run(message) {
        const args = message.content.split(' ');
        if (args.length < 2) {
            return message.channel.send(new RichEmbed()
                .setColor('ORANGE')
                .setTitle(`See ${message.client.commandPrefix}help log for help`)
            );
        } else {
            if (args[1] === 'list') {
                let entry;
                const body = eventModules.map(element => {
                    entry = message.client.provider.get(message.guild, element, false);
                    if (entry.log && entry.log !== undefined) {
                        entry = `<#${entry.log}>`;
                    } else {
                        entry = '*';
                    }
                    return `**${element}** ${entry}`
                });
                return message.channel.send(new RichEmbed()
                    .setColor('GREEN')
                    .setTitle('Available log events')
                    .setDescription(body.join('\n'))
                );

            } else if (args[1] === 'enable') {
                if (!checkArgs(message, args)) {
                    return;
                }
                const channel = message.mentions.channels.first().id;
                const entry = message.client.provider.get(message.guild, args[2], false)
                if (entry) {
                    entry.log = channel;
                }
                message.client.provider.set(message.guild, args[2], entry || {log: channel});
                return message.channel.send(new RichEmbed()
                    .setColor('GREEN')
                    .setDescription(`Enabled logging for event ${args[2]} <#${channel}>`)
                );

            } else if (args[1] === 'disable') {
                if (!checkArgs(message, args)) {
                    return;
                }
                const entry = message.client.provider.get(message.guild, args[2], false)
                if (!entry) {
                    return sendInvalidEntryWarning(message, `Event ${args[2]} is not logged`);
                }
                entry.log = null;
                message.client.provider.set(message.guild, args[2], entry);
                return message.channel.send(new RichEmbed()
                    .setColor('GREEN')
                    .setTitle(`Disabled logging for event ${args[2]}`)
                );
            } else {
                checkArgs(message, args);
            }
        }
    }
}

function checkArgs(message, args) {
    if (!(message.mentions.channels.size > 0) && args[1] === 'enable') {
        sendInvalidEntryWarning(message, `Please enter a channel. See ${message.client.commandPrefix}help log for help`);
        return false;
    }
    if (!eventModules.includes(args[2])) {
        sendInvalidEntryWarning(message, `Please enter a valid event. See ${message.client.commandPrefix}help log for help`);
        return false;
    }
    return true;
};

function sendInvalidEntryWarning(message, warning) {
    return message.channel.send(new RichEmbed()
        .setColor('ORANGE')
        .setTitle(warning)
    );
};
