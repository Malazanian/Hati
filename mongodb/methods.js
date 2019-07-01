const mongo = require('./connection');

module.exports = {
    getVal: async key => {
        try {
            return await mongo.getDB().collection('builds').find({ _id: key }).limit(1).next()
        } catch (err) {
            throw err
        }
    },

    setVal: async (key, val) => {

    }
}
