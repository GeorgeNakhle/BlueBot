module.exports = {
    name: 'twitter',
    description: "Links a given Twitter account.\n\t\t\t\t(1 argument)",
    execute(message, args) {
        if (args[0])
            message.channel.send(`https://twitter.com/${args[0]}`);
        else
            return message.channel.send("```diff\n- ERROR: Missing argument```");
    }
}