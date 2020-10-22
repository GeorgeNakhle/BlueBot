const myIndex = require('../index.js');

module.exports = {
    name: 'play',
    description: "Play audio from a YouTube video.\n\t\t\t\t(1 argument)",
    execute(message, args) {
        if (!args[0])
            return message.channel.send("```diff\n- ERROR: Missing argument```");

        if (!message.member.voice.channel)
            return message.channel.send("```diff\n- ERROR: Must be in voice channel```");

        if (!myIndex.servers[message.guild.id]) myIndex.servers[message.guild.id] = {
            queue: []
        }

        let server = myIndex.servers[message.guild.id];
        server.queue.push(args[0]);

        if (message.guild.voice === undefined || !message.guild.voice.connection)
            message.member.voice.channel.join().then(function (connection) {
                myIndex.playSong(connection, message);
            })
    }
}