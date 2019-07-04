const buildList = require('../builds.json');
const { groupsize } = require('../config.json')
const Build = require('../mongodb/model').Build;

module.exports = {
	name: 'buildlist',
	description: 'displays all of the current builds that have been added.',
	usage: `buildlist \nexample: !buildlist`,
	execute(message) {

        const getAllBuilds = async () => {
			try {
				let buildListArray = await Build.aggregate([{ "$sort": { _id: 1 } }])
                return message.channel.send(`${Build.buildlistSuccess(buildListArray)}`)
			} catch (err) {
				return err
			}
        }

        getAllBuilds()
	},
};