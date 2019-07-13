const Build = require('../mongodb/model').Build;

module.exports = {
	name: 'build',
	args: true,
	description: 'displays the info for classes and build time for the specified group.',
	usage: `build <#> \nexample: !build 1`,
	execute(message, args) {

		const build = async (args, message) => {
			try {
				if (parseInt(args[0]) < 0 || parseInt(args[0]).toString() !== args[0]) {
					return message.channel.send(`${Build.invalidBuild(args, this.usage)}`)
				}
	
				const buildNumber = parseInt(args[0])
				const getBuild = await Build.findOne({ _id: buildNumber })
	
				if (!getBuild) {
					return message.channel.send(`${Build.buildNotExist(buildNumber)}`)
				}
	
				return message.channel.send(`${Build.buildSuccess(getBuild)}`)
			} catch (err) {
				console.log(err)
			}
		}

		build(args, message)
	}
};