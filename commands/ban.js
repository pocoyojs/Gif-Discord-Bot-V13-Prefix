const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {

  name: "ban",
  aliases: ['banir'],

  run: async(client, message, args) => {

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${message.author} **Voce não possui permissão para esse comando.**`); 

        const usu = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Sem Motivo";

        let channelID = db.get(`${message.guild.id}_channelID`)
        if (!channelID) return
        let channel = message.guild.channels.cache.get(channelID)
        if (!channel) return
        
        let clearbutton = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("sim")
            .setLabel("Sim")
            .setStyle("SUCCESS"),
            new MessageButton()
            .setCustomId("nao")
            .setLabel("Não")
            .setStyle("DANGER"),
        )

        let incomplet = new MessageEmbed()
        .setTitle(`🔨 | Comando de Banimento`)
        .setColor("RED")
        .setDescription(`**\n📋 | Descrição: Utilize esse comando para banir alguem.\n\n❓ | Como usar? Use da seguinte forma: gif!ban (usuário/id) (motivo) \n\n📜 | Exemplo: gif!ban @victor ofensa **`)
        if (!args[0]) return message.channel.send({embeds: [incomplet]})

        if(!usu) return message.channel.send({embeds: [incomplet]})

        let confirm = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`**📝 | Tem certeza que quer banir ${usu} ? **`)
        .setFooter(`${message.guild.iconURL({ dynamic: true })} ${message.guild.name} Enviado`)
        .setTimestamp()

        let enviado = await message.channel.send({ embeds: [confirm], components: [clearbutton]})

        const collector = enviado.createMessageComponentCollector({ componentType: "BUTTON"})

        collector.on("collect", async(interaction) => {
            if(!interaction.memberPermissions.has("ADMINISTRATOR")) return interaction.reply({ content: `${interaction.user}, apenas administradores podem limpar o chat`, ephemeral: true})
            if( interaction.customId === "sim") {

                let sucess = new MessageEmbed()
                .setTitle(`✅ | Banimento feito com sucesso!`)
                .setDescription(`**📌 | Voce baniu o jogador ${usu} por ${reason}!**`)
                .setColor("GREEN")
                .setFooter(`🕐 | Enviado `)
                .setTimestamp()
                message.channel.send({embeds: [sucess]})

                enviado.edit({embeds: [sucess]})

                const embed = new MessageEmbed()
                .setTitle(`🚨 | Você está banido!`)
                .setThumbnail(message.guild.iconURL({dynamic : true}))
                .setDescription(`<a:p_mundorosa_real:939717472695750737> | Servidor: ${message.guild.name}\n<a:f_purple2_angels:939718148205203536> | Banido por: ${message.author}\n<:redd_seta:940056158624952392> | Motivo: ${reason}`)
                .setColor("RED")
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL({dynamic : true}));  

                const banmsg = new MessageEmbed()
                .setTitle(`🚨 | Banimento!`)
                .setThumbnail(usu.user.displayAvatarURL())
                .setDescription(`<a:p_mundorosa_real:939717472695750737> | Banido: ${usu.user}\n<a:f_purple2_angels:939718148205203536> | Por: ${message.author}\n<:redd_seta:933046451536285706> | Motivo: ${reason}`)
                .setColor("GREY")
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL());

                await usu.send({embeds: [embed]});
                await usu.ban({
                    reason: reason
                });
                
                channel.send({embeds: [banmsg]});
            }
            if( interaction.customId === "nao") {
                enviado.edit({
                    content: "**Você cancelou a ação de Banimento.**",
                    embeds: [],
                    components: []
                })
            }
        })
        



    } //By: Stompado
}