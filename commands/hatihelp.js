const { prefix } = require('../config.json');
module.exports = {
	name: 'hatihelp',
	description: 'Displays this list of available commands.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		const commandList = commands.map(command => `${prefix}${command.name} - ${command.description}\n`)

		if (!args.length) {
			data.push(
`\`\`\`\n
Here's a list of all my commands:
${commandList.join('')}
\`\`\``)
			data.push(`\nYou can send \`${prefix}hatihelp [command name]\` to get info on a specific command!`);

			return message.channel.send(data, { split: true })
		}
	},
};