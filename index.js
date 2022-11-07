const Discord = require('discord.js');
const Client = new Discord.Client();
const prefix = "!";
const fs = require('fs');
const util = require('util');
var randomHexColor = require('random-hex-color');

//Log Function
var log_file = fs.createWriteStream(__dirname + '/Logs/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
  };

//Jsons
const config = require('./Jsons/config.json');

//Bot Login
Client.login(config.token);

//Ready Function
Client.on('ready', () => {
    Client.user.setActivity(`Starting up... please wait`);
    Client.user.setStatus("online");
    console.log("██████╗░███╗░░██╗██████╗░██████╗░░█████╗░██╗░░░░░██╗░░░░░███████╗██████╗░")
    console.log("██╔══██╗████╗░██║██╔══██╗██╔══██╗██╔══██╗██║░░░░░██║░░░░░██╔════╝██╔══██╗")
    console.log("██║░░██║██╔██╗██║██║░░██║██████╔╝██║░░██║██║░░░░░██║░░░░░█████╗░░██████╔╝")
    console.log("██║░░██║██║╚████║██║░░██║██╔══██╗██║░░██║██║░░░░░██║░░░░░██╔══╝░░██╔══██╗")
    console.log("██████╔╝██║░╚███║██████╔╝██║░░██║╚█████╔╝███████╗███████╗███████╗██║░░██║")
    console.log("╚═════╝░╚═╝░░╚══╝╚═════╝░╚═╝░░╚═╝░╚════╝░╚══════╝╚══════╝╚══════╝╚═╝░░╚═╝")
    console.log("Launched!")
    Client.user.setActivity(`${prefix}help | Playing on ${Client.guilds.cache.size} servers!`);
});

//Message Function

Client.on('message', async (message) => {
    if(message.author.bot) return
    if(message.guild === null) return;
    if(message.author == null){
        return;
    }

    //Json Parsing

    //Args
    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);

    //Commands


        //Help Command
        if(message.content==`${prefix}help`){
            let helpmenu = new Discord.MessageEmbed()
            .setTitle("**DnDRoller Command List**")
            .setColor('#ffdac1')
            .setDescription(`:game_die: **Dice Rolling** \n ${prefix}help dice \n\n :wrench: **Utility** \n ${prefix}help utility`)
            message.channel.send(helpmenu)
        }
        if(message.content==`${prefix}help dice`){
            let helpmenudice = new Discord.MessageEmbed()
            .setTitle("**Dice Commands**")
            .setColor('#ffdac1')
            .setDescription(`:game_die: **${prefix}roll [d4, d6, d8, d100, d10, d12, d20]**: Rolls a die with said amount of sides `)
            .setFooter("[something] = required | (something) = optional ")
            message.channel.send(helpmenudice)
        }

        if(message.content==`${prefix}help utility`){
            let helpmenuutility = new Discord.MessageEmbed()
            .setTitle("**Utility Commands**")
            .setColor("#ffdac1")
            .setDescription(`:ping_pong: **${prefix}ping**: Tells the bots ping \n\n :information_source: **${prefix}info**: Shows the bots info `)
            .setFooter("[something] = required | (something) = optional ")
            message.channel.send(helpmenuutility)
        }

        //Die Commands
        if(message.content.startsWith(`${prefix}roll`)){
            if(!args[1]) return message.channel.send('Please redo the command, and specify what dice you want to roll! \n **(d4, d6, d8, d100, d10, d12, d20)** ')
            //d4
            if(args[1]=='d4'){
                var d4 = Math.floor(Math.random() * 4) + 1;
                message.channel.send(`**${d4}**`);
                return
            }
            //d6
            if(args[1]=='d6'){
                var d6 = Math.floor(Math.random() * 6) + 1;
                message.channel.send(`**${d6}**`);
                return
            }
            //d8
            if(args[1]=='d8'){
                var d8 = Math.floor(Math.random() * 8) + 1;
                message.channel.send(`**${d8}**`);
                return
            }
            //d100
            if(args[1]=='d100'){
                var d100 = Math.floor(Math.random() * 100) + 1;
                message.channel.send(`**${d100}**`);
                return    
            }
            //d10
            if(args[1]=='d10'){
                var d10 = Math.floor(Math.random() * 10) + 1;
                message.channel.send(`**${d10}**`);
                return    
            }
            //d12
            if(args[1]=='d12'){
                var d12 = Math.floor(Math.random() * 12) + 1;
                message.channel.send(`**${d12}**`);
                return
            }
            //d20
            if(args[1]=='d20'){
                var d20 = Math.floor(Math.random() * 20) + 1;
                message.channel.send(`**${d20}**`);
                return
            }
        }


        //Utility Commands
        if(message.content==prefix+"ping"){
            const m = await message.channel.send("Ping?");
            m.edit(`:ping_pong: Pong! | Latency is ${m.createdTimestamp - message.createdTimestamp}ms | API latency is ${Client.ws.ping}ms`);
        }
        
        //Misc
        if(message.content==prefix+"info"){
            let infoemb = new Discord.MessageEmbed()
            .setColor("#ffdac1")
            .setTitle(" **Info:**")
            .setDescription(`Prefix: **${prefix}** \n Servers: **${Client.guilds.cache.size}** \n Ping: **${Client.ws.ping}ms** \n Original Date Created: **7/27/2021** \n Last Updated: **7/27/2021** \n Author: **Thermionic#7421** `)
            message.channel.send(infoemb)
        }

});


//Guild Join Funcion
Client.on("guildCreate", guild => {
    Client.user.setActivity(`${prefix}help | Playing on ${Client.guilds.cache.size} servers!`);             
});
        
//Guild Leave Function
Client.on("guildDelete", guild => {
    Client.user.setActivity(`${prefix}help | Playing on ${Client.guilds.cache.size} servers!`); 
});

//Error Function
Client.on("warn", function (info) {
    console.log(`Warn: ${info}`);
});
Client.on("error", function (error) {
    console.error(
        `Error: ${error}`
    );
})
Client.on("debug", function (info) {
    console.log(`Debug: ${info}`);
});
Client.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});