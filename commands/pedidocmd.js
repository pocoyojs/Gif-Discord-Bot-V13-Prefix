const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'pedidocmd',
    author: 'xande#4353',
    description: `sistema de ticket para pedidos for Victor :)`,

    run: async (client, message) => {

        let limparchat = 25
        message.channel.bulkDelete(limparchat)

        if (message.channel.id !== '939701744567459947') {//ID DO CANAL P ENVIAR A MSG TICKET
            return message.reply({
                content: `**Canal invalido! Utilize o \`comando\` aqui <#ID DO CANAL>.**`
            }).then( msg => 
                { setTimeout ( () => 
                    msg.channel.bulkDelete(1), 
                    10000)
                })

        } else {

        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply ({
                content: `Sem permissao para este comando!`
            }).then( msg => 
                { setTimeout ( () => 
                    msg.channel.bulkDelete(1), 
                    10000)
                })

        } else {

            const canalpedido = client.channels.cache.get('939701744567459947') //ID DO CANAL P DAR O COMANDO DO TICKET

            const embed = new MessageEmbed()
                .setTitle(`**🍸 | PEÇA SEU GIF** \n`)
                .setDescription(`<a:w_seta_dreams:939880895660310588> Esse canal é exclusivo para pedidos de gifs.\n> Horário de funcionamento: 15:00 até às 17:10\n\n<a:w_seta_dreams:939880895660310588> **Funcionamento do pedido:**\n\n> **Após apertar a reação o nosso bot irá mandar uma mensagem onde você deverá fazer o seu pedido.**\n\n<a:w_seta_dreams:939880895660310588> **Entrega:**\n\n**As entregas serão feitas no chat de banners, após a entrega deixe seu feedback para o entregador.** <#939701744865267732>\n\n<a:w_seta_dreams:939880895660310588> **Observações:**\n> Você poderá fazer pedidos a cada 2 horas.`)
                .setTimestamp(new Date())
                .setThumbnail(message.guild.iconURL())
                .setFooter(`🍸 DREAMS GIFS 夢`)

            canalpedido.send({embeds: [embed]}).then((msg ) => { 
                msg.react('✅')
            })

                    client.on('messageReactionAdd', async (reaction, user, message) => {

                        const canalmarkes = client.channels.cache.get('940253846473687100') // ID DO CANAL Q VAI RECEBER OS PEDIDOS
                        const emoji = '✅';
                
                        if(user.partial) await user.fetch();
                        if(reaction.partial) await reaction.fetch();
                        if(reaction.message.partial) await reaction.message.fetch();
                        if (user.bot) return;
                        if (!reaction.message.guild) return;

                        
                        if (reaction.emoji.name === emoji) {
                            reaction.users.remove(user)
                            reaction.message.channel.send({
                                embeds: [new MessageEmbed().setDescription(`Qual seu pedido? (Informe apenas em uma linha)`)]
                            }).then(async msg => {
                                let opedido = msg.channel.createMessageCollector(m => m.author.id === message.author.id, { 
                                    max: 1
                                });
                
                            opedido.on('collect', xande => {
                                
                                if (xande.author.bot) return;

                                const pedidoenviado = new MessageEmbed()
                                    .setTitle('**Pedido recebido!**')
                                    .setDescription(`**Pedido:** \`\`\`${opedido.collected.first().content}\`\`\`\ **\nID do socilitante**\`\`\`${xande.author.id}\`\`\`\ \n<a:w_seta_dreams:939880895660310588> **Apos finalizar pedido mandem la em** <#939701744567459949>`)
                                    .setTimestamp(new Date())
                                    .setFooter(`🍸 DREAMS GIFS 夢`)
            
                                canalmarkes.send({
                                    content: `**NOVO PEDIDO!**\n\n**Pedido de:** ${xande.author}\n**Marcação:** <@&939701742113808411>`,
                                    embeds: [pedidoenviado]
                                })

                                xande.delete()
                                msg.edit({embeds: [new MessageEmbed().setDescription('✅ | Pedido foi enviado com sucesso.')]}).then (msg => {
                                    setTimeout (() => 
                                    msg.channel.bulkDelete(1)
                                    , 5000)
                                })
                                opedido.stop()
                            })
                        })
                    }
                }) // fim do collect
            } //fim do else
        } // fim do else 
    }
}
