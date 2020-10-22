const Discord = require('discord.js');

module.exports = {
    name: 'asuka',
    description: "Self-explanatory.",
    execute(message, args) {
        let attachment = new Discord.MessageAttachment("https://i.imgur.com/3NzObCG.png");
        message.channel.send(attachment);
    }
}