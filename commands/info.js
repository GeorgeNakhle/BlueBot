const myIndex = require('../index.js');

module.exports = {
    name: 'info',
    description: `Shows the current version for ${myIndex.NAME}.`,
    execute(message, args) {
        let msg = "```ini\n";
        msg += `[Name]: ${myIndex.botInfo['NAME']}\n`;
        msg += `[Version]: v${myIndex.botInfo['VERSION']}\n`;
        msg += `[Author]: ${myIndex.botInfo['AUTHOR']}\n`;
        msg += "```";

        message.channel.send(msg);
    }
}