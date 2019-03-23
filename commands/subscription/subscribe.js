const { Command }	= require('discord.js-commando');
const { RichEmbed }	= require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'subscribe',
            group: 'subscription',
            memberName: 'subscribe',
            description: 'Subscribes user to a tag',
            examples: [`${client.commandPrefix}subscribe Clannad`],
            aliases: ['sub'],
            guildOnly: true
        });
    }

    async run(message) {
        const tag = message.content.split(' ').splice(1).join(' ').toLowerCase();
        const collection = this.client.database.collection('subscriptions');
        if (tag) {
            collection.findOne({_id: message.guild.id, [tag]: {$exists: true}}).then(entry => {
                if (entry) {
                    collection.updateOne(
                        {_id: message.guild.id},
                        {$addToSet: {[tag]: message.author.id}},
                    ).then(commandResult => {
                        if (commandResult.result.nModified) {
                            return message.channel.send(new RichEmbed()
                                .setColor('GREEN')
                                .setTitle(`Subscribed to ${tag}`)
                            );
                        } else {
                            return message.channel.send(new RichEmbed()
                                .setColor('ORANGE')
                                .setTitle(`You are already subscribed to ${tag}`)
                            );
                        }
                    });
                } else {
                    return message.channel.send(new RichEmbed()
                        .setColor('RED')
                        .setTitle(`Tag ${tag} does not exist`)
                    );
                }
            })
        } else {
            collection.findOne({_id: message.guild.id}, {projection: { _id: 0 }}).then(entry => {
                if (entry) {
                    return message.channel.send(new RichEmbed()
                        .setColor('ORANGE')
                        .setTitle('Please mention a tag to subscribe to')
                    );
                } else {
                    return message.channel.send(new RichEmbed()
                        .setColor('RED')
                        .setTitle('This server does not have any registered tags')
                    );
                }
            });
        }
    }
};
