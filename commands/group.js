const Build = require('../mongodb/model').Build;

module.exports = {
	name: 'group',
	args: true,
	description: 'displays the current specified participants for the specified group.',
	usage: `group <#> \nexample: !group 1`,
	execute(message, args) {

		const group = async (args, message) => {
			try {
				if (parseInt(args[0]) < 0 || parseInt(args[0]).toString() !== args[0]) {
					return message.channel.send(`${Build.invalidBuild(args, this.usage)}`)
				}
	
				const buildNumber = parseInt(args[0])
				const getBuild = await Build.findOne({ _id: buildNumber })
	
				if (!getBuild) {
					return message.channel.send(`${Build.buildNotExist(buildNumber)}`)
				}
	
				if (getBuild.group.length === 0) {
					return message.channel.send(`${Build.groupEmpty(buildNumber)}`)
				}
	
				let group = []
				getBuild.group.map(member => {
					let name = member.name.replace(/"/g,"")
					name = name.charAt(0).toUpperCase() + name.slice(1)
					group.push(`#${name} - ${member.class.replace(/"/g,"")}\n`)
				})
				group = group.join('')
				return message.channel.send(`${Build.groupSuccess(getBuild, group)}`)
			} catch (err) {
				console.log(err)
			}
		}

		group(args, message)
	},
};