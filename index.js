require('dotenv').config();
const { Client, IntentsBitField, Events, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { SystemPrint } = require('./utils.js');
const { channel, buttons, embeds } = require('./config.js');

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildMembers],
    partials: [],
});

client.on(Events.ClientReady, (readyClient) => {
    SystemPrint('info', `Connected as ${readyClient.user.tag}`);

    const channelToSend = readyClient.channels.cache.get(channel.id);
    if(channel.bulkDelete){
        channelToSend.bulkDelete(5);
    }
    setTimeout(() => {
        const row = new ActionRowBuilder().addComponents(buttons.authorization);
        const footerIcon = embeds.footer.icon.useClientAvatar ? readyClient.user.displayAvatarURL() : embeds.footer.icon.useCustomURL ? embeds.footer.icon.url : null;
        const embed = embeds.footer.show ? embeds.welcome.setFooter({ text: embeds.footer.text, iconURL: footerIcon }) : embeds.welcome;
        if(embeds.footer.timestamp){
            embed.setTimestamp();
        }
        channelToSend.send({ embeds: [embed], components: [row] });
    }, 1000);

    require('./oauth.js')
});

client.login(process.env.DISCORD_TOKEN);

async function GiveUserRole(userId, roleId){
    const guild = await client.guilds.fetch(channel.guildId);
    const member = await guild.members.fetch(userId);
    member.roles.add(roleId);
}

async function RemoveUserRole(userId, roleId){
    const guild = await client.guilds.fetch(channel.guildId);
    const member = await guild.members.fetch(userId);
    member.roles.remove(roleId);
}

async function SendEmbedToUser(userId, embedName){
    const user = await client.users.fetch(userId);
    const footerIcon = embeds.footer.icon.useClientAvatar ? client.user.displayAvatarURL() : embeds.footer.icon.useCustomURL ? embeds.footer.icon.url : null;
    const embed = embeds.footer.show ? embeds[embedName].setFooter({ text: embeds.footer.text, iconURL: footerIcon }) : embeds[embedName];
    if(embeds.footer.timestamp){
        embed.setTimestamp();
    }
    user.send({ embeds: [embed] });
}

module.exports = {
    GiveUserRole,
    RemoveUserRole,
    SendEmbedToUser
}