const fs = require('fs');
const { prefix } = require('../config.json');
const mongo = require('../mongodb/connection')
module.exports = {
	name: 'setbuild',
	args: true,
    description: 'sets the info for classes and build time for the specified group.',
    usage: `setbuild <build #> <build info> \nexample: !setbuild 1 Healer Healer Shaman Skald DPS DPS DPS DPS 9PM EST`,
	execute(message, args) {

		const setBuild = async buildNumber => {
			try {
				let newBuildData = JSON.stringify(args.slice(1).join(' '))
				return await mongo.getDB().collection('builds').insertOne({ _id: `${args[0]}`, "build" : newBuildData })
			} catch (err) {
				console.log(err)
			}
		}
		setBuild(args[0])

		if (parseInt(args[0]) > 0 && parseInt(args[0]).toString() === args[0]) {
			let buildData = JSON.stringify(args.slice(1).join(' '))
			fs.readFile('builds.json', 'utf8', (err, data) => {
				if (err) { throw err }

				obj = JSON.parse(data)
				if (!obj.builds[args[0]]) {
					obj.builds[args[0]] = {"build": {}}
				}

				obj.builds[args[0]].build = buildData
				json = JSON.stringify(obj)
				fs.writeFile('builds.json', json, 'utf8', err => { if (err) throw err })
				// This is fine for now. Maybe pass the buildData from the file after it has finished writing if there are issues with data retrieval for other users in a short window of time
				return message.channel.send(`\`\`\`md\n#You set build ${args[0]} to ${buildData}\`\`\``)
			})
		} else {
			return message.channel.send(`Please enter a build in the following format: \`\n${prefix}${this.usage}\``)
		}
	},
};