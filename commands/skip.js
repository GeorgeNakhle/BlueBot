const myIndex = require('../index.js');

module.exports = {
    name: 'skip',
    description: "Skip audio from currently playing YouTube video.",
    execute(message, args) {
        if (!message.guild.voice.connection)
            return message.channel.send("```diff\n- ERROR: No song currently playing```");

        if (!message.member.voice.channel)
            return message.channel.send("```diff\n- ERROR: Must be in voice channel```");

        let server = myIndex.servers[message.guild.id];
        if (server.dispatcher)
            server.dispatcher.end();
        message.channel.send("```diff\n+ Skipped current song```");
        console.log("Skipped song");
    }
}