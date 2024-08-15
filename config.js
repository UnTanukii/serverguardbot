const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
require('dotenv').config();

const config = {
    'locale': 'fr',//-> locale for moment.js
    'requiredGuilds': ['GUILD ID', 'GUILD ID'],//-> array of guilds where the user must be to be authorized
    'userAllGuilds': false,//-> if you want to check if the user is in all guilds in the array or just one
    'authorizedRole': 'ROLE ID',//-> role id to give to the user if he is authorized
    'oauth':{
        'address': '127.0.0.1',
        'port': 3000,
    },
    'channel':{
        'guildId': 'GUILD ID',//-> guild id where the bot will send the message
        'id': 'CHANNEL ID',//-> channel id where the bot will send the message
        'bulkDelete': true,//-> if you want to delete all messages in the channel before sending the message
    },
    'embeds': {
        'footer': {
            'show': true,//-> if you want to show the footer
            'text': 'by @untanukii',//-> footer text
            'icon': {
                'useClientAvatar': true,//-> if you want to use the client avatar
                'useCustomURL': false,//-> if you want to use a custom url
                'url': 'your url',//-> if you want to use a custom url
            },
            'timestamp': true,//-> if you want to display the timestamp
        },
        'welcome': new EmbedBuilder()
            .setTitle('Welcome to Our Server!')
            .setDescription("To join this server, please click the button below to authorize your Discord account. This will verify that you are a member of the required servers. Once verified, you'll be granted access to the server.")
            .setColor('Blue'),
        'success': new EmbedBuilder()
            .setTitle('Success')
            .setDescription('You have successfully authorized your account and joined the server. Welcome!')
            .setColor('Green'),
        'error': new EmbedBuilder()
            .setTitle('Access Denied')
            .setDescription('Unfortunately, your request to join the server could not be processed because you are not a member of the required servers. Please make sure you are part of the necessary servers and try again.')
            .setColor('Red')
            .setFooter({ text: 'If you believe this is an error, please contact support.' }),
    },
    'buttons': {},
}

config.buttons.authorization = new ButtonBuilder()
        .setLabel('Authorize')
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(`http://${config.oauth.address}:${config.oauth.port}/callback`)}&response_type=code&scope=identify%20guilds`)

module.exports = config;