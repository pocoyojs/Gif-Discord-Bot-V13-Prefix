const Discord = require("discord.js"); 
const client = new Discord.Client({intents: 32767});
const config = require("./config.json");
const { MessageEmbed } = require('discord.js') 

client.login(config.token); 

client.once('ready', async () => {

    console.log(`🎈 - ${client.user.tag} Foi iniciada em ${client.guilds.cache.size} servidores!\n👑 - Tendo acesso a ${client.channels.cache.size} canais!\n❣️ - Contendo ${client.users.cache.size} usuarios!` )

})

client.on('messageCreate', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.on("ready", () => {
    let activities = [
      `💻 ┃ Meu prefix? gif!`,
      ],
      i = 0;
    setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        }), 5000); 
    client.user
        .setStatus("online")
  });

  client.on("messageCreate", message => {
    
    if (message.author.bot) return;
    if (message.channel.type == '')
    return
    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
    let bot = new Discord.MessageEmbed()
    .setTitle(`Minhas informações`)
    .setColor("RANDOM")
    .setDescription(`\n**📆 | Fui criado em \`5/02/2022\`     🕵️‍♂️ | Criado por \`Victor\`     🔧 | Meu prefixo é \`gif!\`     💻 | Meus comandos ? Use \`gif!help\` para saber!**`)
    message.channel.send({ embeds: [bot] })
    }
});

const db = require('quick.db')
client.on("messageUpdate", async (message, oldMessage) => {

  let setlogsmsgenv = db.get(`channelLogseditmsg_${message.guild.id}`);
  if (setlogsmsgenv === null) return;

  if (message.author.bot) return;

  let msgchannel = message.channel;
  let msgantiga = message.content;
  let msgeditada = oldMessage.content;

  let embed = new Discord.MessageEmbed()
      .setTitle(`📝 Mensagem editada`)
      .setColor("RANDOM")
      .addFields(
          {
              name: `Autor da mensagem`,
              value: `${message.author}`,
              inline: false,
          },
      )

      .addFields(
          {
              name: `Canal`,
              value: `${msgchannel}`,
              inline: false,
          },
      )
      .addFields(
          {
              name: `Mensagem antiga`,
              value: `\`\`\`${msgantiga}\`\`\``,
              inline: false
          },
      )
      .addFields(
          {
              name: `Mensagem editada`,
              value: `\`\`\`${msgeditada}\`\`\``,
              inline: false,
          }
      )
      .setTimestamp()
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })

  message.guild.channels.cache.get(setlogsmsgenv).send({ embeds: [embed] })
});

client.on('guildMemberAdd', async member => {

    let guild = client.guilds.cache.get('939701741941829673') //ID DO SERVER
        if(guild != member.guild) {
            console.log({
                content: `${member.id} entrou em outro servidor!`
            })
            
        } else {

        let channelid = client.channels.cache.get('939701744567459944') //ID DO CANAL A ENVIAR BOAS VINDAS
        const embedmember = new MessageEmbed()
            .setAuthor(`${member.user.username} — Bem-vindo(a) a Dreams Gifs! `)
            .setThumbnail(member.user.displayAvatarURL())
            .setColor('RANDOM')  
            .setDescription(`<:r_Brokenastro_dreams:939717726090432592> **・Seja Maker: <#939701743795732528>\n<:r_Brokenastro_dreams:939717726090432592>・Mude a cor do seu Nick:** <#939701743795732522>`)
            .setFooter(`ID do usuário: ${member.id}`)
            .setTimestamp(new Date())
        
        channelid.send({
	    content: `${member}`,
            embeds: [embedmember]
        });
        member.roles.add("939701741987979293") //ID DO AUTOROLE
    }
})

const rga = require("random-gif-api")

  client.on('ready', (client) => {

    let funcao = [rga.bite(), rga.bread(), rga.chocolate(), rga.cuddle(), rga.dance(), rga.kill(), rga.laugh(), rga.lick(), rga.lonely(), rga.pat(), rga.poke(), rga.pregnant(), rga.punch(), rga.run(), rga.sleep(), rga.spank(), rga.spit(), rga.steal(), rga.tickle(), rga.bored(), rga.angry(), rga.happy()];
   
    setInterval(function () {
    let random = funcao[Math.floor(Math.random() * funcao.length)];

    random.then((data) => {
        const canalgifs = client.channels.cache.get('939701744865267733'); // id do canal para enviar os gifs
            canalgifs.send({ embeds: [new MessageEmbed().setImage(`${data}`).setColor("RANDOM")] })
        });
    }, 10000) //time em ms para enviar um gif
})

client.on("messageDelete", async (message) => {

    let channelDellogs = db.get(`channelLogs_${message.guild.id}`);
    if (channelDellogs === null) return;

    if (message.author.bot) return;

    let user1 = message.author;
    let channel2 = message.channel;
    let msgDelete = message.content;

    let embed = new Discord.MessageEmbed()
        .setTitle(`🗑 Mensagem excluída`)
        .setColor("RANDOM")
        .addFields(
            {
                name: `Autor da mensagem:`,
                value: `${user1}`,
                inline: false,
            },

        )
        .addFields(
            {
                name: `Canal:`,
                value: `${channel2}`,
                inline: false,
            },
        )
        .addFields(
            {
                name: `Mensagem:`,
                value: `\`\`\`${msgDelete}\`\`\``,
                inline: false,
            }
        )
        .setTimestamp()
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true })})
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

        try {

    message.guild.channels.cache.get(channelDellogs).send({ embeds: [embed] })

        } catch (e) { }
});