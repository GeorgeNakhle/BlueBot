const myIndex = require('../index.js');

module.exports = {
    name: 'gif',
    description: "Uploads a random specified gif from Google.\n\t\t\t\t(<0 arguments)",
    execute(message, args) {
        if (!args[0])
            return message.channel.send("```diff\n- ERROR: Missing argument```");
        else {
            // Take all arguments, pass them into 'searchResult'
            let searchResult = "";
            for (let i = 0; i < args.length; i++)
                searchResult += `${args[i]} `;

            // Remove last character from 'searchResult'
            searchResult = searchResult.substring(0, searchResult.length - 1);
            searchResult += " gif";
            myIndex.getMedia(message, searchResult);
        }
    }
}