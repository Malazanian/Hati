const buildList = require('../builds.json');
const { prefix } = require('../config.json');
module.exports = {
	name: 'build',
	args: true,
	description: 'displays the info for classes and build time for the specified group.',
	usage: `build <#> \nexample: !build 1`,
	execute(message, args) {
        const builds = buildList.builds;

		if (!parseInt(args[0]) > 0 || parseInt(args[0]).toString() !== args[0]) {
			return message.channel.send(`\`\`\`diff\n-${args[0]} is not a valid build number. \n-Please enter a build in the following format: ${prefix}${this.usage}\`\`\``)
		}

		if (parseInt(args[0]) > 0 && builds[args[0]]) {
			return message.channel.send(`\`\`\`md\n#Build ${args[0]} - ${builds[args[0]].build}\`\`\``)
		} else {
			return message.channel.send(`\`\`\`diff\n-Build ${args[0]} does not exist yet.\`\`\``);
		}
	}
};