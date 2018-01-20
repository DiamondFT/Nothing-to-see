const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const music = require('discord.js-music-v11');

const TOKEN = "MzQyNDAzMDA4NjMxNDA2NTky.DJcONg.6D3hlZqXPtqtezWZzVzkGG2hTjg";
const PREFIX = ">"

function generateHex() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);

}
function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispacher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispacher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = [

	"Yes",
	"No",
	"Maybe",
];
var bot = new Discord.Client();

var servers = {};

bot.on("ready", function() {
	console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
	console.log(`[Start] ${new Date()}`);
	bot.user.setStatus('playing');
	bot.user.setGame('>help | ExoBear');
})

bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
		case "ping":
			message.channel.sendMessage("🏓");
			break;
		case "info":
			message.channel.sendMessage("I'm a super dope bot created by diamondFTW#6550");
			break;
			case "8ball":
			if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);  
				else message.channel.sendMessage("Can't read that");
				break;
					 case "help":
            var help = new Discord.RichEmbed()
                .setAuthor("ExoBear Bot")
                .addField("Help", ">help - Shows This Text")
                .addField("Music", ">music - shows the music help")
                .addField("Support", ">support - Link to support discord")
                .addField("Info", ">info - Bot info")
                .addField("Creator", ">creator - The creator's website", "**(WIP)**")
                .addField("Fun Stuff", ">fun - Shows the fun things")
                .setThumbnail(message.author.avatarURL)
                .setColor(0xff0000)
            message.author.sendEmbed(help)
            message.channel.sendMessage("Check your DMs");
            break;
            case "music":
           var music = new Discord.RichEmbed()
           .addField("Music", ">play then the song name ")
           .addField("Music", ">skip ")
           .addField("Music", ">stop ")
           .addField("Music", ">volume then number")
           .setThumbnail(message.author.avatarURL)
           .setColor(0xff0000)
           message.channel.sendEmbed(music)
           break;
               case "play":
          if (!args[1]) {
                              message.channel.sendMessage("please provide a link");
                              return;
                          }
                      if (!message.member.voiceChannel) {
                            message.channel.sendMessage("You must be in a voice channel");
                              return;
                      }

                      if(!servers[message.guild.id]) servers[message.guild.id] = {
                           queue: []
                      };

                      var server = servers[message.guild.id];

                      server.queue.push(args[1]);
                      if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                                YTDL.getInfo(args.join(" "), function(err, info) {
                                  const title = info.title
                                  message.channel.sendMessage(`Now playing \`${title}\``)
                              })
                          play(connection, message);
                      });
    break;
    case "skip":
        var server = servers[message.guild.id];

        if (server.dispacher) server.dispacher.end();
    break;
    case "stop":
         var server = servers[message.guild.id];

        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    break;
           case "fun":
			var fun = new Discord.RichEmbed()
		.addField("fun", ">8ball <message>")
		.addField("fun", ">ping ")
		.setThumbnail(message.author.avatarURL)
		.setColor(0xff0000)
		message.channel.sendEmbed(fun)
		break;
		 case "support":
			var support = new Discord.RichEmbed()
		.addField("support", ">https://discord.gg/hWvpCbs<")
		.setThumbnail(message.author.avatarURL)
		.setColor(0xff0000)
		message.channel.sendEmbed(support)
		break;	
		case "Creator":
			var Creator = new Discord.RichEmbed()
		.addField("Creator", "><")
		.setThumbnail(message.author.avatarURL)
		.setColor(0xff0000)
		message.channel.sendEmbed(Creator)
		break;

	}
});
bot.login(TOKEN);