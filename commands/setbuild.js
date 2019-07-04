const Build = require('../mongodb/model').Build;

module.exports = {
	name: 'setbuild',
	args: true,
    description: 'sets the info for classes and build time for the specified group.',
    usage: `setbuild <build #> <build info> \nexample: !setbuild 1 Healer Healer Shaman Skald DPS DPS DPS DPS 9PM EST`,
	execute(message, args) {
		const buildNumber = parseInt(args[0]);
		let buildData = JSON.stringify(args.slice(1).join(' '))

		const setBuild = async (buildNumber, buildData) => {
			try {
				const build = new Build({ build: buildData })
				return await Build.findOneAndUpdate({ _id: buildNumber }, build, { upsert: true, new: true })
			} catch (err) {
				return err
			}
		}

		const printBuild = async buildCommand => {
			try {
				if (parseInt(args[0]) > 0 && parseInt(args[0]).toString() === args[0]) {
					const newBuild = await buildCommand()
					return message.channel.send(`${newBuild.setBuildSuccess()}`)
				} else {
					return message.channel.send(`${Build.setBuildFailure(this.usage)}`)
				}
			} catch (err) {
				return err
			}
		}

		printBuild(() => setBuild(buildNumber, buildData))
	},
};