const buildList = require('../builds.json');
module.exports = {
	name: 'buildlist',
	description: 'displays all of the current builds that have been added.',
	usage: `buildlist \nexample: !buildlist`,
	execute(message) {
        const data = [];
        const builds = buildList.builds;
        const displayBuildsText = Object.keys(builds).map(buildNumber => `#${buildNumber} - ${builds[buildNumber].build}\n`).join('')

        if (Object.entries(builds).length === 0 && builds.constructor === Object) {
            return message.channel.send(`\`\`\`diff\n-There are no builds added yet! \n-Use !setbuild to add a build to the list.\`\`\``)
        } else {
            data.push(`\`\`\`md\n#Here is a list of the current builds: \n${displayBuildsText}\`\`\``)
            return message.channel.send(data, { split: true })
        }
	},
};