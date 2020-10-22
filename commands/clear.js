module.exports = {
    name: 'clear',
    description: "Clears a specified number of lines from the channel.\n\t\t\t\t(1 argument)",
    execute(message, args) {
        if (!args[0])
            return message.channel.send("```diff\n- ERROR: Missing argument```");
        args[0]++;
        message.channel.bulkDelete(args[0]);
    }
}