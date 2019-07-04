const { prefix, groupsize } = require('../config.json');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: String,
    class: String,
    discordId: String,
    date: { type: Date, default: Date.now },
})

const BuildSchema = new Schema({
    _id: Number,
    build: String,
    group: [ PlayerSchema ],
    size: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
},{ _id: false });

BuildSchema.methods.setBuildSuccess = function () {
    return (`\`\`\`md\n#You set build ${this._id} to ${this.build}\`\`\``)
}

BuildSchema.statics.addSuccess = function (message, playerName, classInfo, buildNumber) {
    return (`\`\`\`md\n#${message.author.username} has added ${playerName}: ${classInfo} to group ${buildNumber}\`\`\``)
}

BuildSchema.statics.buildlistSuccess = function (buildsArray) {
    return (`\`\`\`md\n#Here is a list of the current builds: \n${buildsArray.map(build => `#${build._id} - ${build.group.length}/${groupsize} - ${build.build}\n`).join('')}\`\`\``)
}

BuildSchema.statics.setBuildFailure = function (usage) {
    return (`\`\`\`diff\n-Please enter a build in the following format: \n-${prefix}${usage}\`\`\``)
}

const Build = mongoose.model('Build', BuildSchema);

module.exports = {
    Build: Build
}