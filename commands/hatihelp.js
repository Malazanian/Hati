const { prefix } = require('../config.json');
module.exports = {
	name: 'hatihelp',
	description: 'Displays this list of available commands.',
	aliases: ['commands'],
	usage: 'hatihelp <command name>',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		const displayCommandsText = commands.map(command => `${prefix}${command.name} - ${command.description}\n`).join('')

		if (!args.length) {
			data.push(`\`\`\`\nHere's a list of all my commands: \n${displayCommandsText}\`\`\``)
			data.push(`\nYou can send \`${prefix}${this.usage}\` to get info on a specific command!`);
			return message.channel.send(data, { split: true })
		}
	},
};