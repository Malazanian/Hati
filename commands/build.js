const buildList = require('../builds.json');
module.exports = {
	name: 'build',
	args: true,
	description: 'displays the info for classes and build time for the specified group.',
	usage: `<build #> \nexample: !build 1`,
	execute(message, args) {
        const builds = buildList;

		if (args[0] === 'list') {
			if (builds.length === 0) {
				return message.channel.send(`You didn't specify a build. Here is a list of the current builds: \nThere are no builds added yet!`)
			} else {
				return message.channel.send(`You didn't specify a build. Here is a list of the current builds: ${builds}`);
			}
		}

	},
};