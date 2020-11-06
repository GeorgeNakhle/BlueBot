/////////////////////////////////////////////////////////////////////////////////
//  Bot:    BlueBot
//  Author: George Nakhle
/////////////////////////////////////////////////////////////////////////////////

//#region DECLARATION BLOCK -----------------------------------------------------

const Discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');
const ytdl = require('ytdl-core');
const fs = require('fs');

const { Client, Attachment } = require('discord.js');
const bot = new Client();
bot.commands = new Discord.Collection();

// Writing all command '.js' files into 'Client' object
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

const TOKEN = "NzMyNDg4ODc0NjEzMjc2Njc0.Xw4PxA.8X_EdH4wqLd1O0TBxR3k33faxV8";

//#region BOT INFO --------------------------------------------------------------

const PREFIX = '!';
const NAME = "BlueBot";
const VERSION = "1.0.0";
const AUTHOR = "George Nakhle";

const BOT_INFO = {
    'PREFIX': PREFIX,
    'NAME': NAME,
    'VERSION': VERSION,
    'AUTHOR': AUTHOR,
    'COMMANDS': bot.commands
};

//#endregion --------------------------------------------------------------------

let servers = {}; // Music queue

//#endregion --------------------------------------------------------------------

//#region EVENT HANDLER BLOCK ---------------------------------------------------

/////////////////////////////////////////////////////////////////////////////////
//  EVENT HANDLER: Bot turns on
/////////////////////////////////////////////////////////////////////////////////

bot.on("ready", () => {
    bot.user.setActivity("!commands");
    greeting = `${NAME} v${VERSION} is online!`;
    console.log('\x1b[32m%s\x1b[0m', greeting);
})

/////////////////////////////////////////////////////////////////////////////////
//  EVENT HANDLER: User joins server
/////////////////////////////////////////////////////////////////////////////////

bot.on("guildMemberAdd", member => {
    let botChannel = "bot";
    let channel = member.guild.channels.cache.find(channel => channel.name == botChannel);

    // If 'bot' channel doesn't exist, exit event handler
    if (!channel)
        return;

    // Send gretting message in 'bot' channel
    channel.send(`> ${member}, welcome to **${member.guild}**!
    > Enjoy your stay!`);
})

/////////////////////////////////////////////////////////////////////////////////
//  EVENT HANDLER: Message is sent in any channel
/////////////////////////////////////////////////////////////////////////////////

bot.on("message", message => {

    // Splits user message on whitespaces
    // Outputs words into console
    if (!message.author.bot)
        console.log(`ARGS: ${message.content.split(" ")}`);

    // Tell dad joke if applicable.
    tellDadJoke(message);

    // Message doesn't start with '!'
    // Message was sent by bot
    if (!message.content.startsWith(PREFIX) || message.author.bot)
        return;

    // Splits user message on whitespaces, puts into array
    // Includes command word
    let args = message.content.slice(PREFIX.length).split(" ");
    // Takes first word from array
    // Removes command word from array
    let command = args.shift().toLowerCase();

    try {
        // Execute the command parsed from message containing 'PREFIX'
        bot.commands.get(command).execute(message, args);
    }
    catch (error) {
        // Command doesn't exist
        console.log('\x1b[31m%s\x1b[0m', error);
        return message.channel.send("```diff\n- ERROR: Unknown command```");
    }

    //#region OLD CODE ----------------------------------------------------------

    //args = message.content.substring(PREFIX.length).split(" ");

    // switch (args[0]) {
    //     case "ping":
    //         message.channel.send("pong!");
    //         break;

    //     case "twitch":
    //         message.channel.send("https://www.twitch.tv/bluepinata");
    //         break;

    //     case "info":
    //         if (args[1] == "version")
    //             message.channel.send("v" + VERSION);
    //         else
    //             message.channel.send("ERROR: Invalid argument");
    //         break;

    //     case "clear":
    //         if (!args[1])
    //             return message.channel.send("ERROR: Invalid argument");
    //         args[1]++;
    //         message.channel.bulkDelete(args[1]);
    //         break;

    //     case "embed":
    //         const embed = new Discord.MessageEmbed()
    //             .setTitle("User Information")
    //             .addField("Name", message.author.username)
    //             .addField("Current Server", message.guild.name)
    //             .setColor(0x67BADC)
    //             .setThumbnail(message.author.displayAvatarURL())
    //             .setFooter(NAME + " v" + VERSION);
    //         message.channel.send(embed);
    //         break;

    //     case "commands":
    //         let msg = "```\n" + NAME + " v" + VERSION + " commands\n";
    //         for (let c in commands)
    //             msg += `\n${PREFIX}${c} - ${commands[c]}`
    //         msg += "```";
    //         message.channel.send(msg);
    //         break;

    //     case "asuka":
    //         const attachment = new Discord.MessageAttachment("https://i.imgur.com/3NzObCG.png");
    //         message.channel.send(attachment);
    //         break;

    //     case "image":
    //         if (!args[1])
    //             message.channel.send("ERROR: Invalid argument");
    //         else {
    //             let searchResult = "";
    //             for (let i = 1; i < args.length; i++)
    //                 searchResult += `${args[i]} `;
    //             searchResult = searchResult.substring(0, searchResult.length - 1);
    //             image(message, searchResult);

    //             // Print search result
    //             // console.log(`"${searchResult}"`);
    //         }
    //         break;

    //     case "gif":
    //         if (!args[1])
    //             message.channel.send("ERROR: Invalid argument");
    //         else {
    //             let searchResult = "";
    //             for (let i = 1; i < args.length; i++)
    //                 searchResult += `${args[i]} `;
    //             searchResult = searchResult.substring(0, searchResult.length - 1);
    //             searchResult += " gif";
    //             image(message, searchResult);

    //             // Print search result
    //             // console.log(`"${searchResult}"`);
    //         }
    //         break;

    //     case "react":
    //         message.react("🐵");
    //         break;

    //     case "coinflip":
    //         if (Math.round(Math.random()))
    //             message.channel.send("**HEADS**");
    //         else
    //             message.channel.send("**TAILS**");
    //         break;

    //     case "play":
    //         function play(connection, message) {
    //             server = servers[message.guild.id];
    //             server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));
    //             server.queue.shift();

    //             server.dispatcher.on("end", function () {
    //                 if (server.queue[0]) {
    //                     play(connection, message);
    //                 }
    //                 else {
    //                     connection.disconnect();
    //                 }
    //             });
    //         }

    //         if (!args[1]) {
    //             message.channel.send("ERROR: Invalid link");
    //             return;
    //         }

    //         if (!message.member.voice.channel) {
    //             message.channel.send("ERROR: Must be in voice channel");
    //             return;
    //         }

    //         if (!servers[message.guild.id]) servers[message.guild.id] = {
    //             queue: []
    //         }

    //         server = servers[message.guild.id];
    //         server.queue.push(args[1]);

    //         if (!message.member.voice.connection) message.member.voice.channel.join().then(function (connection) {
    //             play(connection, message);
    //         })
    //         break;

    //     case "skip":
    //         server = servers[message.guild.id];
    //         if (server.dispatcher) server.dispatcher.end();
    //         message.channel.send(`Skipped current song`);
    //         break;
    //     // QUEUE DONT WORK?

    //     case "stop":
    //         server = servers[message.guild.id];
    //         if (message.guild.voice.connection) {
    //             for (let i = 0; i < server.queue.length; i++) {
    //                 server.queue.splice(i, 1);
    //             }

    //             server.dispatcher.end();
    //             message.channel.send(`Ended the queue and left the voice channel`);
    //             console.log("Stopped the queue.");
    //         }

    //         if (message.guild.voice.connection) message.guild.voice.connection.disconnect();
    //         break;

    //     default:
    //         message.channel.send("ERROR: Unknown command");
    //         break;
    // }

    //#endregion ----------------------------------------------------------------
})

//#endregion --------------------------------------------------------------------

//#region EXPORTS ---------------------------------------------------------------

// Variables & functions for other '.js' files to use
exports.botInfo = BOT_INFO;
exports.getMedia = getMedia;
exports.playSong = playSong;
exports.servers = servers;

//#endregion --------------------------------------------------------------------

bot.login(TOKEN);

//#region FUNCTIONS -------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////////
//  Function:       tellDadJoke
//  Parameter(s):   Object of type 'Message'
//  Description:    Splits message on whitespaces.
//                  Detects if variation of the word "I'm" was found.
//                  If found, store remainder of words into string.
//                  Post joke in channel containing the string.           
/////////////////////////////////////////////////////////////////////////////////

function tellDadJoke(message) {
    // Don't tell joke if bot sent message
    if (message.author.bot)
        return;

    // Array with variations of the word "I'm"
    // Don't need capitals, toLowerCase() will suffice
    let detectionArr = ["i'm", "im"];
    // Array with special cahracters
    let specialCharArr = ['.', '!', '?', ' '];
    // Split message on whitespaces
    let args = message.content.split(" ");
    // Loops through all words in message
    for (let i = 0; i < args.length; i++)
        if (detectionArr.includes(args[i].toLowerCase())) {
            let joke = "";
            // Start from word AFTER "I'm"
            // Loop until message ends
            for (let k = i + 1; k < args.length && args[k - 1].slice(-1) != '.' && args[k - 1].slice(-1) != '!' && args[k - 1].slice(-1) != '?'; k++)
                joke += `${args[k]} `;
            // Take last character of joke
            // Remove any special characters
            // Loop until there are no more special cahracters
            while (specialCharArr.includes(joke.slice(-1)))
                joke = joke.substring(0, joke.length - 1);

            message.channel.send(`Hi ${joke}, I'm Dad.`);
        }
}

/////////////////////////////////////////////////////////////////////////////////
//  Function:       getMedia
//  Parameter(s):   Object of type 'Message', String containing search field
//  Description:    Runs a search query using 'field'.
//                  Puts resulting urls into array.
//                  Choose random index in array and sends.
/////////////////////////////////////////////////////////////////////////////////

function getMedia(message, field) {
    let options = {
        url: `http://results.dogpile.com/serp?qc=images&q=${field}`,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function (error, response, responseBody) {
        if (error)
            return;

        $ = cheerio.load(responseBody);

        let links = $(".image a.link");
        // Creates array of random urls selected from search query
        let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        // No search results
        if (!urls.length)
            return;

        // Send random image from 'urls' array
        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
}

/////////////////////////////////////////////////////////////////////////////////
//  Function:       playSong
//  Parameter(s):   
//  Description:           
/////////////////////////////////////////////////////////////////////////////////

function playSong(connection, message) {
    let server = servers[message.guild.id];
    server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));
    server.queue.shift();

    server.dispatcher.on("finish", function () {
        if (server.queue[0])
            playSong(connection, message);
        else
            connection.disconnect();
    });
}

//#endregion --------------------------------------------------------------------

//#region TODO ------------------------------------------------------------------

// TODO: Nuke old commented code
// TODO: Fix if statement in 'tellDadJoke()' to use 'specialCharArr' variable
// TODO: Change 'TOKEN' constant to read from file w/ environment variables (check tutorial vid)
// TODO: Event handler on user leaving
// TODO: 'play.js', 'skip.js', 'queue.js' -> embeds
// TODO: 'poll.js' -> poll command
// https://github.com/Glyan/MineBot/blob/master/index.js

//#endregion --------------------------------------------------------------------