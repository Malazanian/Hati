const { prefix, groupsize } = require('../config.json');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: String,
    class: String,
    discordid: String,
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

BuildSchema.statics.groupSuccess = function (build, group) {
    return (`\`\`\`md\n(Created At: ${moment.tz(build.date, 'America/New_York').format('YYYY-MM-DD hh:mm:ss A')} EST)\n#Build ${build._id} Info: ${build.build}\n#Group ${build._id}: - ${build.size}/${groupsize}\n${group}\`\`\``)
}

BuildSchema.statics.clearSuccess = function (message, buildNumber) {
    return (`\`\`\`md\n#${message.author.username} has cleared group ${buildNumber}\`\`\``)
}

BuildSchema.statics.removeSuccess = function (message, playerName, buildNumber) {
    return (`\`\`\`md\n#${message.author.username} has removed ${playerName} from group ${buildNumber}\`\`\``)
}

BuildSchema.statics.removeBuildSuccess = function (message, buildNumber) {
    return (`\`\`\`md\n#${message.author.username} has removed build ${buildNumber}\`\`\``)
}

BuildSchema.statics.groupFailure = function (usage) {
    return (`\`\`\`diff\n-Please enter a group in the following format: \n-${prefix}${usage}\`\`\``)
}

BuildSchema.statics.invalidBuild = function (args, usage) {
    return (`\`\`\`diff\n${args[0]}is not a valid build number. \n-Please enter a group in the following format: \n-${prefix}${usage}\`\`\``)
}

BuildSchema.statics.groupEmpty = function (buildNumber) {
    return (`\`\`\`diff\n-There is nobody in group ${buildNumber} yet!\`\`\``)
}

BuildSchema.statics.setBuildFailure = function (usage) {
    return (`\`\`\`diff\n-Please enter a build in the following format: \n-${prefix}${usage}\`\`\``)
}

BuildSchema.statics.addSuccess = function (message, playerName, classInfo, buildNumber) {
    return (`\`\`\`md\n#${message.author.username} has added ${playerName}: ${classInfo} to group ${buildNumber}\`\`\``)
}

BuildSchema.statics.buildSuccess = function (build) {
    return (`\`\`\`md\n#Build ${build._id} - ${build.build}\`\`\``)
}

BuildSchema.statics.buildlistSuccess = function (buildsArray) {
    return (`\`\`\`md\n#Here is a list of the current builds: \n${buildsArray.map(build => `#${build._id} - ${build.group ? build.group.length : 0}/${groupsize} - ${build.build}\n`).join('')}\`\`\``)
}

BuildSchema.statics.buildNotExist = function (buildNumber) {
    return (`\`\`\`diff\n-Build ${buildNumber} does not exist yet!\`\`\``)
}

const Build = mongoose.model('Build', BuildSchema);

module.exports = {
    Build: Build
}