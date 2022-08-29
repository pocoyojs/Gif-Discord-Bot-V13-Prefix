const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {

  name: "setban",

  run: async(client, message, args) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${message.author} **Voce não possui permissão para esse comando.**`);

    if(!args[0]) return message.reply('**Você tem que determinar o canal!**')
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!channel) return message.reply('**Você tem que determinar o canal!**')
    let id = channel.id

    let sucess = new Discord.MessageEmbed()
    .setTitle(`:white_check_mark: | Canal de Banimento definido com sucesso!`)
    .setColor("GREEN")
    .setDescription(`🔨 | O novo canal de banimento é ${channel}`)

    message.reply({embeds: [sucess]})

    db.set(`${message.guild.id}_channelID`,id)

  }

} //By: Stompado