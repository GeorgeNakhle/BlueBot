const Discord = require('discord.js');
const myIndex = require('../index.js');

module.exports = {
    name: 'embed',
    description: "Shows your user profile.",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor(0x67BADC)
            .setTitle("User Information")
            .addField("Name", message.author.username)
            .addField("Current Server", message.guild.name)
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter(`${myIndex.botInfo['NAME']} v${myIndex.botInfo['VERSION']}`);
        message.channel.send(embed);
    }
}