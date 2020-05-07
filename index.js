const { Client, MessageEmbed } = require('discord.js');
const bot = new Client();
const ms = require("ms");

const token = 'NzA3NjM5MTA4Mzg5OTYxNzI5.XrLvBg.a3tegfh0fLq-hQo4YS9kU-OavHk';

const PREFIX = '!';

var servers = {};

bot.on('ready', () => {
    console.log('Botas aktyvus!');
    bot.user.setActivity('PORNHUB.COM', { type: 'PLAYING' }).catch(console.error);
})

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "atejo");
    if (!channel) return;

    channel.send(`Sveikas atvykes, ${member} !`)
});

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'clear': // IŠVALO ŽINUTES
            if (!message.member.roles.cache.some(r => r.name === "Savininkas")) return message.channel.send('Neturi privilegijų nauoti šiai komandai')
                .then(msg => msg.delete({ timeout: 3000 }));
            if (!args[1]) return message.reply('Įveskite skaičių')
            message.channel.bulkDelete(args[1]);
            break;

        case 'mute': // MUTE KOMANDA
            if (!message.member.roles.cache.some(r => r.name === "Savininkas")) return message.channel.send('Neturi privilegijų nauoti šiai komandai')
            let person = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
            if (!person) return message.reply("Pažymėk žmogų kurį nori užtildyti!");

            let mainrole = message.guild.roles.cache.find(role => role.name === "Narys");
            let muterole = message.guild.roles.cache.find(role => role.name === "mute");

            if (!muterole) return message.reply("Nėra tokios rolės!");

            let time = args[2];

            if (!time) {
                return message.reply("Bloga žinutė");
            }

            person.roles.remove(mainrole.id);
            person.roles.add(muterole.id);

            message.channel.send(`@${person.user.tag} buvo užtildytas ${ms(ms(time))}`);

            setTimeout(function () {
                person.roles.add(mainrole.id)
                person.roles.add(muterole.id);
                message.channel.send(`@${person.user.tag} atitildytas!`)
            }, ms(time));
        case "balsavimas": // BALSAVIMAS
            if (!message.member.roles.cache.some(r => r.name === "Savininkas")) return message.channel.send('Neturi privilegijų nauoti šiai komandai')
            const Embed = new MessageEmbed()
                .setColor(0xFFC300)
                .setTitle("Balsavimas")
                .setDescription("!balsavimas")

            if (!args[1]) {
                message.channel.send(MessageEmbed);
                break;
            }

            let msgArgs = args.slice(1).join(" ");

            message.channel.send("📋  " + "**" + msgArgs + "**").then(messageReaction => {
                messageReaction.react("👍");
                messageReaction.react("👎");
                message.delete(3000).catch(console.error);
            });

            break;
    }
})



bot.login(token);