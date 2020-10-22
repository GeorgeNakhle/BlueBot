module.exports = {
    name: 'twitch',
    description: "Links a given Twitch channel.\n\t\t\t\t(1 argument)",
    execute(message, args) {
        if (args[0])
            message.channel.send(`https://www.twitch.tv/${args[0]}`);
        else
            return message.channel.send("```diff\n- ERROR: Missing argument```");
    }
}