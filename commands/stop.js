const myIndex = require('../index.js');

module.exports = {
    name: 'stop',
    description: "Stop audio from current playing YouTube video.",
    execute(message, args) {
        let server = myIndex.servers[message.guild.id];
        if (message.guild.voice.connection) {
            for (let i = server.queue.length - 1; i >= 0; i--) {
                server.queue.splice(i, 1);
            }

            server.dispatcher.end();
            message.channel.send("```diff\n+ Ended queue\n+ Left voice channel```");
            console.log("Stopped queue");
        }

        if (message.guild.voice.connection)
            message.guild.voice.connection.disconnect();
    }
}