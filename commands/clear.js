const Build = require('../mongodb/model').Build;

module.exports = {
	name: 'clear',
	args: true,
    description: 'clears the specified group.',
    usage: `clear <#>\nexample: !clear 1`,
	execute(message, args) {

        const clear = async (args, message) => {
			try {
                if (parseInt(args[0]) < 0 || parseInt(args[0]).toString() !== args[0]) {
                    return message.channel.send(`${Build.invalidBuild(args, this.usage)}`)
                }
                
                const buildNumber = parseInt(args[0]);
                const getBuild = await Build.findOne({ _id: buildNumber })

                if (!getBuild) {
                    return message.channel.send(`${Build.buildNotExist(buildNumber)}`)
                }

                if (getBuild.group.length === 0) {
                    return message.channel.send(`${Build.groupEmpty(buildNumber)}`)
                }

                await Build.findByIdAndUpdate({ _id: buildNumber }, { $set: { size: 0 }, $unset: { group: null } })
                return message.channel.send(`${Build.clearSuccess(message, buildNumber)}`)
			} catch (err) {
				console.log(err)
			}
		}

        clear(args, message)
	},
};