const myIndex = require('../index.js');

module.exports = {
    name: 'queue',
    description: "Show songs in queue.",
    execute(message, args) {
        let server = myIndex.servers[message.guild.id];

        // Queue is empty
        if (server.queue.length == 0)
            message.channel.send("```diff\n+ Queue is empty```");
        else {
            // Queue contains songs
            let msg = "```ini";
            // Header of queue
            msg += `\n【Song Queue】\n`;

            // Loop through all songs
            for (let i = 0; i < server.queue.length; i++)
                msg += `\n[${i + 1}] ${server.queue[i]}`
            msg += "```";
            message.channel.send(msg);
        }

    }
}

// Get YT title from URL -> ttps://www.npmjs.com/package/get-youtube-title