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
				return await Build.aggregate([{ "$sort": { _id: 1 } }], (err, res) => {
                    if (err) console.error(err)
                    return message.channel.send(`${Build.buildlistSuccess(res)}`)
				})
			} catch (err) {
				return err
			}
        }

        getAllBuilds()
	},
};