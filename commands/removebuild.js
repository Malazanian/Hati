const Build = require('../mongodb/model').Build;

module.exports = {
	name: 'removebuild',
	args: true,
    description: 'removes a build from the build list. This will also remove the group associated with it.',
    usage: `removebuild <#> \nexample: !removebuild 1`,
	execute(message, args) {

        const removeBuild = async (args, message) => {
			try {
                if (parseInt(args[0]) < 0 || parseInt(args[0]).toString() !== args[0]) {
                    return message.channel.send(`${Build.invalidBuild(args, this.usage)}`)
                }
                
                const buildNumber = parseInt(args[0]);
                const getBuild = await Build.findOne({ _id: buildNumber })

                if (!getBuild) {
                    return message.channel.send(`${Build.buildNotExist(buildNumber)}`)
                }

                await Build.deleteOne({ _id: buildNumber })
                return message.channel.send(`${Build.removeBuildSuccess(message, buildNumber)}`)
			} catch (err) {
				console.log(err)
			}
		}

        removeBuild(args, message)
	},
};