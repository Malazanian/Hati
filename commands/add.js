const Build = require('../mongodb/model').Build;

module.exports = {
	name: 'add',
	args: true,
    description: 'adds a player to the specified group.',
    usage: `add <#> <player name> <class/alts>\nexample: !add 1 Onos Warrior/BD`,
	execute(message, args) {

        const checkPlayers = (message, playerName) => {
            return message.member.guild.members.filter(member => member.user.username.toLowerCase().includes(playerName.replace(/"/g,""))).map(player => `"${player.user.tag}"`).join('')
        }

        const add = async (args, message) => {
			try {
                const buildNumber = parseInt(args[0])

                if (buildNumber > 0 && args.length >= 2) {

                    const playerName = JSON.stringify(args[1]).toLowerCase()
                    const classInfo = JSON.stringify(args.slice(2).join(' '))
                    const id = checkPlayers(message, playerName)
    
                    let group
                    if (id !== null) {
                        group = { name: playerName, class: classInfo, discordid: id }
                    } else {
                        group = { name: playerName, class: classInfo }
                    }

                    const getBuild = await Build.findOne({ _id: buildNumber })
                    if (getBuild !== null) {
                        let selectedBuild = await Build.findOne({ _id: buildNumber, 'group.name': group.name })
                        if (selectedBuild !== null) {
                            let newPlayer = await Build.findOneAndUpdate({ _id: buildNumber, 'group.name': group.name }, group, { new: true })
                            console.log('UpdatedPlayer: ', newPlayer)
                        } else {
                            let newPlayer = await Build.findOneAndUpdate({ _id: buildNumber }, { $inc: { size: 1 }, $push: { group: group } }, { upsert: true, new: true })
                            console.log('NewPlayer: ', newPlayer)
                        }
                        return message.channel.send(`${Build.addSuccess(message, playerName, classInfo, buildNumber)}`)
                    } else {
                        return message.channel.send(`${Build.buildNotExist(buildNumber)}`)
                    }
                } else {
                    return message.channel.send(`${Build.setBuildFailure(this.usage)}`)
                }

			} catch (err) {
				console.log(err)
			}
        }

        add(args, message)
	},
};