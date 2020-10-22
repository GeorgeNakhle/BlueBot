const Discord = require('discord.js');

module.exports = {
    name: 'coinflip',
    description: "Flip a coin. Heads or tails?",
    execute(message, args) {
        // Choose random decimal number between 0 and 1
        // Round number to closest integer
        let attachment;
        if (Math.round(Math.random())) {
            message.channel.send("*Heads*")
            attachment = new Discord.MessageAttachment("https://i.imgur.com/zx1EXt4.png");
        }
        else {
            message.channel.send("*Tails*")
            attachment = new Discord.MessageAttachment("https://i.imgur.com/xXsZive.png");
        }
        message.channel.send(attachment);
    }
}