const { locale } = require('./config.js');
const moment = require('moment');
moment.locale(locale);

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

module.exports = {
    SystemPrint
}