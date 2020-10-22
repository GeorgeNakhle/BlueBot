const myIndex = require('../index.js');

module.exports = {
    name: 'commands',
    description: "Shows a list of all available commands.",
    execute(message, args) {
        // Allows for blue colouring on command names
        let msg = "```ini";
        // Header of command list
        msg += `\n【${myIndex.botInfo['NAME']} v${myIndex.botInfo['VERSION']} commands】\n\n`;

        // Loop through all commands
        for (const [key, value] of myIndex.botInfo['COMMANDS']) {
            tmpName = `[${myIndex.botInfo['PREFIX']}${value['name']}] `;
            msg += `${tmpName.padEnd(15, "─")} ${value['description']}\n`;
        }
        msg += "```";

        message.channel.send(msg);
    }
}