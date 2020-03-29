require('dotenv').config()
const clean = require('./clean');
const fs = require('fs');
const Discord = require('discord.js');
const token = process.env.HATI_TOKEN
const ownerID = process.env.OWNER_ID
const { maintenance, prefix } = require('./config.json');
const mongoose = require('mongoose');
const options = {
	useNewUrlParser: true,
	useFindAndModify: false,
	reconnectTries: Number.MAX_VALUE,
	connectTimeoutMS: 30000,
	keepAlive: true,
	keepAliveInitialDelay: 300000
}

mongoose.connect(process.env.MONGODB_URI, options)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {

	const client = new Discord.Client();
	client.commands = new Discord.Collection();
	
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	}
	
	const cooldowns = new Discord.Collection();

	client.once('ready', () => console.log('Ready!'));
	client.on('message', message => {
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		if (message.content.startsWith(prefix + "eval")) {
			if(message.author.id !== process.env.ownerID) return;
			try {
				const code = args.join(" ");
				let evaled = eval(code);
		 
			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);
		 
				message.channel.send(clean(evaled), {code:"xl"});
			} catch (err) {
				message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
			}
		}

		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		// Maintenace Flag Enabled
		if (command && maintenance) {
			return message.channel.send(`\`\`\`fix\nI'm off playing with Sköll! I will be home later.\`\`\``)
		}

		// No Arguments Provided
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.usage}\``;
			}

			return message.channel.send(reply);
		}
		
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	});

	client.login(token);
});

