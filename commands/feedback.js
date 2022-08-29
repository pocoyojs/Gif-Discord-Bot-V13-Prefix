const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "feedback",
    description: "dar um feedback",
    author: 'xande#4353',

    run: async (client, message) => {

        const canal = message.channel
        canal.bulkDelete(1)

        if (message.channel.type == "dm") return;

        let embedUM = new MessageEmbed()
            .setDescription('**__Feedback__**\n\n> Qual seu feedback?')
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024}))
            .setFooter({text: `Sistema de Feedback ${message.guild.name}`})
            .setTimestamp()

        canal.send({embeds: [embedUM]}).then(async msg => {
                let oFeedback = msg.channel.createMessageCollector(m => m.author.id === message.author.id, { 
                    max: 1
                });
        
        oFeedback.on("collect", () => {

            canal.bulkDelete(1)

            let embedDOIS = new MessageEmbed()
                .setDescription('**__Nota Avaliativa__**\n\n> Avalie com uma nota **(de 0/10)**?')
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024}))
                .setTimestamp(new Date())
                .setFooter({text: `Sistema de Feedback ${message.guild.name}`})

            msg.edit({embeds: [embedDOIS]}).then(async msg => {
    
            let notaFeedback = msg.channel.createMessageCollector(m => m.author.id === message.author.id, { 
                max: 1
            });
                notaFeedback.on("collect", () => {

                    canal.bulkDelete(1)

                    let feedback = new MessageEmbed()
                        .setTitle('**Dream Gifs**')
                        .setDescription(`> **Usuario:**\n ${message.author}`)
                        .addField('> **Feedback:**', `${oFeedback.collected.first().content}`)
                        .addField('> **Nota:**', `**${notaFeedback.collected.first().content}` + `/10**`)
                        .setTimestamp(new Date())
                        .setFooter({text: `Sistema de Feedback ${message.guild.name}`})
                        .setThumbnail(message.author.displayAvatarURL())

                    client.channels.cache.get('940790973284380712').send({embeds: [feedback]})
                    
                    let confirmFeedback = new MessageEmbed()
                    .setTitle('Feedback Enviado!')
                    .setDescription(`${message.author}, Seu feedback foi enviado com sucesso!`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp(new Date)
                    .setFooter({text: `${message.guild.name}`})
                        
                    msg.edit({embeds: [confirmFeedback]}).then(
                        msg => {
                            setTimeout( () => msg.channel.bulkDelete(1), 10000)
                        })
                        notaFeedback.stop() //fim do collect
                    })
                })
            oFeedback.stop() //fim do collect 
            })
        })                        
    }
}