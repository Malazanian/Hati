const MongoClient = require('mongodb').MongoClient;
let _db;

module.exports = {
    connectToServer: callback => MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err, client) => {
        _db = client.db('heroku_9133p17v')
        callback()
    }),

    getDB: () => _db
}