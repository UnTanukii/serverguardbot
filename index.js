require('dotenv').config();
const { Client, IntentsBitField, Events, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { channel, buttons, embeds, oauth, requiredGuilds, userAllGuilds, authorizedRole, locale } = require('./config.js');
const moment = require('moment');
moment.locale(locale);
const express = require('express');
const app = express();
const { URLSearchParams } = require('url');

////////////////////////////
// Utils Implementation //
////////////////////////////
function SystemPrint(type, data){
    if(type == 'error'){
        console.log(`\x1b[90m${moment().format("L")} ${moment().format("LTS")}\x1b[0m \x1b[41m[ERROR]\x1b[0m \x1b[31m-\x1b[0m`);
        console.log(data);
    }else if(type == 'info'){
        console.log(`\x1b[90m${moment().format("L")} ${moment().format("LTS")}\x1b[0m \x1b[44m[INFO]\x1b[0m - \x1b[34m${data}\x1b[0m`);
    }else if(type == 'success'){
        console.log(`\x1b[90m${moment().format("L")} ${moment().format("LTS")}\x1b[0m \x1b[42m[SUCCESS]\x1b[0m - \x1b[32m${data}\x1b[0m`);
    }
};

////////////////////////////
// Discord.js Implementation //
////////////////////////////
const client = new Client({intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]});

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
        if(embeds.footer.timestamp){embed.setTimestamp()};
        channelToSend.send({ embeds: [embed], components: [row] });
    }, 1000);
});

client.login(process.env.DISCORD_TOKEN);

// Functions
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
    const footerIcon = embeds.footer.icon.useClientAvatar ? client.user.displayAvatarURL() : embeds.footer.icon.useCustomURL ? embeds.footer.icon.url : null;
    const embed = embeds.footer.show ? embeds[embedName].setFooter({ text: embeds.footer.text, iconURL: footerIcon }) : embeds[embedName];
    if(embeds.footer.timestamp){embed.setTimestamp()};
    (await client.users.fetch(userId)).send({ embeds: [embed] });
}

////////////////////////////
// OAuth2 Implementation //
////////////////////////////
app.get('/success', (req, res) => {
    res.send('<script>window.close()</script>'); 
});

app.get('/callback', async(req, res) => {
    const code = req.query.code;
    const data = new URLSearchParams();
    data.append('client_id', process.env.CLIENT_ID);
    data.append('client_secret', process.env.CLIENT_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('code', code);
    data.append('redirect_uri', `http://${oauth.address}:${oauth.port}/callback`);
    const response = await fetch('https://discord.com/api/oauth2/token',{method: 'POST',body: data,headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    const json = await response.json();
    const authorization = `Bearer ${json.access_token}`;
    res.redirect('/success');
    const userResponse = await fetch('https://discord.com/api/users/@me',{headers:{authorization: authorization}});
    const user = await userResponse.json();
    const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds',{headers:{authorization: authorization}});
    const guilds = await guildsResponse.json();
    const isInGuild = userAllGuilds ? requiredGuilds.every((guild) => guilds.some((g) => g.id === guild)) : requiredGuilds.some((guild) => guilds.some((g) => g.id === guild));
    if(isInGuild){
        GiveUserRole(user.id, authorizedRole);
        SendEmbedToUser(user.id, 'success');
    }else{
        RemoveUserRole(user.id, authorizedRole);
        SendEmbedToUser(user.id, 'error');
    }
});

const server = app.listen(oauth.port, oauth.address, () => {
    const serverInfos = server.address();
    SystemPrint('info', `App listening at http://${serverInfos.address}:${serverInfos.port}`);
});

////////////////////////////