const buildList = require('../builds.json');
module.exports = {
	name: 'group',
	args: true,
	description: 'displays the current specified participants for the specified group.',
	usage: `group <#> \nexample: !group 1`,
	execute(message, args) {
		const builds = buildList.builds;

		if (!builds[args[0]]) {
			return message.channel.send(`\`\`\`diff\n-Build ${args[0]} does not exist yet.\`\`\``)
		}

		if (builds[args[0]].build && !builds[args[0]].group) {
			return message.channel.send(`\`\`\`diff\n-There is nobody in group ${args[0]} yet!\`\`\``)
		} else {
			let group = []
			for (const [member, info] of Object.entries(builds[args[0]].group)) {
				group.push(`#${member} - ${info}\n`)
			}
			group = group.join('')
			return message.channel.send(`\`\`\`md\n#Group ${args[0]}:\n${group}\`\`\``);
		}
	},
};