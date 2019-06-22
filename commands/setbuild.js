const fs = require('fs');
const buildList = require('../builds.json');
module.exports = {
	name: 'setbuild',
	args: true,
    description: 'sets the info for classes and build time for the specified group.',
    usage: `<build #> <build info> \nexample: !setbuild 1 Healer Healer Shaman Skald DPS DPS DPS DPS 9PM EST`,
	execute(message, args) {
		const builds = buildList.builds
		console.log(builds)

		if (parseInt(args[0]) > 0) {
			let buildData = JSON.stringify(args.slice(1).join(' '))
			fs.readFile('builds.json', 'utf8', (err, data) => {
				if (err) {
					console.log(err)
				} else {
					obj = JSON.parse(data)
					obj.builds[args[0]] = buildData
					json = JSON.stringify(obj)
					fs.writeFile('builds.json', json, 'utf8', (err) => {if (err) console.log(err)})
				}
			})
			return message.channel.send(`You set build ${args[0]} to ${builds[args[0]]}`)
		} else {
			return message.channel.send(`Please enter a build in the following format: \`\n${this.usage}\``)
		}

	},
};