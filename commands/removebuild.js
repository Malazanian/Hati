const fs = require('fs');
const { prefix } = require('../config.json');
const buildList = require('../builds.json');
module.exports = {
	name: 'removebuild',
	args: true,
    description: 'removes a build from the build list. This will also remove the group associated with it.',
    usage: `removebuild <#> \nexample: !removebuild 1`,
	execute(message, args) {
        const builds = buildList.builds

		if (parseInt(args[0]) > 0) {
			fs.readFile('builds.json', 'utf8', (err, data) => {
                if (err) { throw err }
                if (builds[args[0]]) {
                    let tempBuildInfo = builds[args[0]].build
                    obj = JSON.parse(data)
                    delete obj.builds[args[0]]
                    json = JSON.stringify(obj)
                    fs.writeFile('builds.json', json, 'utf8', err => { if (err) throw err })
                    // This is fine for now. Maybe pass the buildData from the file after it has finished writing if there are issues with data retrieval for other users in a short window of time
                    return message.channel.send(`\`\`\`md\n#${message.author.username} has removed build ${args[0]} - ${tempBuildInfo}\`\`\``)
                } else {
                    return message.channel.send(`\`\`\`diff\n-Build ${args[0]} does not exist yet!\`\`\``)
                }
			})
		} else {
			return message.channel.send(`Please enter a build in the following format: \`\n${prefix}${this.usage}\``)
		}
	},
};