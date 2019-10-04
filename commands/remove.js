const Build = require('../mongodb/model').Build;

module.exports = {
	name: 'remove',
	args: true,
    description: 'removes a player from the specified group.',
    usage: `remove <#> <player name> <class/alts>\nexample: !remove 1 Onos Warrior/BD`,
	execute(message, args) {

        const remove = async (args, message) => {
            try {
                if (parseInt(args[0]) < 0 || parseInt(args[0]).toString() !== args[0]) {
                    return message.channel.send(`${Build.invalidBuild(args, this.usage)}`)
                }
    
                const buildNumber = parseInt(args[0])
                const playerName = JSON.stringify(args[1]).toLowerCase()
                const getBuild = await Build.findOne({ _id: buildNumber })
    
                if (!getBuild) {
                    return message.channel.send(`${Build.buildNotExist(buildNumber)}`)
                }
                
                if (getBuild.group.length === 0) {
                    return message.channel.send(`${Build.groupEmpty(buildNumber)}`)
                }
                
                await Build.findOneAndUpdate({ _id: buildNumber }, { $inc: { size: -1 }, $pull: { 'group': { 'name': playerName } } })
                return message.channel.send(`${Build.removeSuccess(message, playerName, buildNumber)}`)
            } catch (err) {
                console.log(err)
            }
		}

		remove(args, message)
	},
};