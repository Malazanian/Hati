const fs = require('fs');
const { prefix } = require('../config.json');
const buildList = require('../builds.json');
const Build = require('../mongodb/model').Build;

module.exports = {
	name: 'add',
	args: true,
    description: 'adds a player to the specified group.',
    usage: `add <#> <player name> <class/alts>\nexample: !add 1 Onos Warrior/BD`,
	execute(message, args) {

        const add = async (args) => {
			try {
                const buildNumber = parseInt(args[0])
                const playerName = JSON.stringify(args[1]).toLowerCase()
                const classInfo = JSON.stringify(args.slice(2).join(' '))
                const group = { name: playerName, class: classInfo }
                
                let selectedBuild = await Build.findOne({ _id: buildNumber, 'group.name': group.name })
                if (selectedBuild !== null) {
                    let newPlayer = await Build.findOneAndUpdate({ _id: buildNumber, 'group.name': group.name }, group, { new: true })
                    console.log('UpdatedPlayer: ', newPlayer)
                } else {
                    let newPlayer = await Build.findOneAndUpdate({ _id: buildNumber }, { $push: { group: group } }, { upsert: true, new: true })
                    console.log('NewPlayer: ', newPlayer)
                }
                
                return message.channel.send(`${Build.addSuccess(message, playerName, classInfo, buildNumber)}`)
			} catch (err) {
				return err
			}
        }

        add(args)
        


        // const builds = buildList.builds

		// if (parseInt(args[0]) > 0 && args.length >= 2) {
		// 	fs.readFile('builds.json', 'utf8', (err, data) => {
        //         if (err) { throw err }
        //         if (builds[args[0]]) {
                    
        //             obj = JSON.parse(data)
        //             if (!obj.builds[args[0]].group) {
        //                 obj.builds[args[0]]["group"] = {}
        //             }

        //             if (obj.builds[args[0]].group) {
        //                 obj.builds[args[0]].group[args[1]] = args.length < 3 ? args[1] : args.slice(2).join(' ')
        //                 json = JSON.stringify(obj)
        //                 fs.writeFile('builds.json', json, 'utf8', err => { if (err) throw err })
        //                 // This is fine for now. Maybe pass the buildData from the file after it has finished writing if there are issues with data retrieval for other users in a short window of time
        //                 return message.channel.send(`\`\`\`md\n#${message.author.username} has added ${args[1]}: ${args.slice(2).join(' ')} to group ${args[0]}\`\`\``)
        //             }
        //         } else {
        //             return message.channel.send(`\`\`\`diff\n-Build ${args[0]} does not exist yet!\`\`\``)
        //         }
		// 	})
		// } else {
		// 	return message.channel.send(`Please enter a build in the following format: \`\n${prefix}${this.usage}\``)
		// }
	},
};