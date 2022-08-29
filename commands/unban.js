const Discord = require('discord.js')

module.exports = {

    name: "unban",
    aliases: ['desbanir'],

    run: async(client, message, args) => {

 if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${message.author} **Voce não possui permissão para esse comando.**`);
 
        let incomplet = new Discord.MessageEmbed() //Caso use apenas (seu prefixo)unban
        .setTitle(`🔨 | Comando de Banimento`)
        .setColor("RED")
        .setDescription(`**\n📋 | Descrição: Utilize esse comando para desbanir alguem.\n\n❓ | Como usar? Use da seguinte forma: gif!ban (usuário/id) \n\n📜 | Exemplo: s!unban @Stompado13/709550600651669545**`)
       
        let jogador = args[0];

         if (!jogador) return message.channel.send({embeds: [incomplet]});

        message.guild.members.unban(jogador);

        const sucess = new Discord.MessageEmbed() //Mensagem quando desbanir
        .setTitle(`✅ | Desbanimento feito com sucesso!`)
        .setColor("GREEN")
        .setDescription(`**📌 | Voce desbaniu o jogador <@${jogador}> com sucesso!**`)
        message.channel.send({embeds: [sucess]})
    }
}