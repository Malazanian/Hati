const fs = require('fs');
const { prefix } = require('../config.json');
const buildList = require('../builds.json');
module.exports = {
	name: 'remove',
	args: true,
    description: 'removes a player from the specified group.',
    usage: `remove <#> <player name> <class/alts>\nexample: !remove 1 Onos Warrior/BD`,
	execute(message, args) {
        const builds = buildList.builds

		if (parseInt(args[0]) > 0) {
			fs.readFile('builds.json', 'utf8', (err, data) => {
                if (err) { throw err }
                if (builds[args[0]]) {

                    obj = JSON.parse(data)
                    if (!obj.builds[args[0]].group) {
                        return message.channel.send(`\`\`\`diff\n-Group ${args[0]} does not exist yet!\`\`\``)
                    }

                    if (obj.builds[args[0]].group[args[1]]) {
                        delete obj.builds[args[0]].group[args[1]]
                        json = JSON.stringify(obj)
                        fs.writeFile('builds.json', json, 'utf8', err => { if (err) throw err })
                        // This is fine for now. Maybe pass the buildData from the file after it has finished writing if there are issues with data retrieval for other users in a short window of time
                        return message.channel.send(`\`\`\`md\n#${message.author.username} has removed ${args[1]} from group ${args[0]}\`\`\``)
                    } else {
                        return message.channel.send(`\`\`\`diff\n-${args[1]} is not in Group ${args[0]}!\`\`\``)
                    }

                } else {
                    return message.channel.send(`\`\`\`diff\n-Build ${args[0]} does not exist yet!\`\`\``)
                }
			})
		} else {
			return message.channel.send(`Please enter a build in the following format: \`\n${prefix}${this.usage}\``)
		}
	},
};