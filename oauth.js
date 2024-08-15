const { oauth, requiredGuilds, userAllGuilds, authorizedRole } = require('./config.js');
const { URLSearchParams } = require('url');
const { SystemPrint } = require('./utils.js');
const { GiveUserRole, RemoveUserRole, SendEmbedToUser } = require('./index.js');
const express = require('express');
const app = express();

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

module.exports = app;