const buildList = require('../builds.json');
const { prefix } = require('../config.json');
const { getVal } = require('../mongodb/methods');

module.exports = {
	name: 'build',
	args: true,
	description: 'displays the info for classes and build time for the specified group.',
	usage: `build <#> \nexample: !build 1`,
	execute(message, args) {

		const getBuild = async buildNumber => {
			let result = await getVal(buildNumber)
			if (result) {
				return message.channel.send(`\`\`\`md\n#Build ${buildNumber} - ${result.build}\`\`\``)
			} else {
				return message.channel.send(`\`\`\`diff\n-Build ${buildNumber} does not exist yet.\`\`\``);
			}

		}

		if (parseInt(args[0]) < 0 || parseInt(args[0]).toString() !== args[0]) {
			return message.channel.send(`\`\`\`diff\n-${args[0]} is not a valid build number. \n-Please enter a build in the following format: ${prefix}${this.usage}\`\`\``)
		}

		if (parseInt(args[0]) > 0 && parseInt(args[0]).toString() === args[0]) {
			getBuild(args[0])
		}
	}
};