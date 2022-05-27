const Config = require('../Config/Default');
const Log = require('./Log.Function');

function PrintAboutFirmWare() {
    Log('warn', '----------------------------------------');
    Log('warn', '|          React Clock Work            |');
    console.log(`| Author: Mohammed Nayeem              |`);
    console.log(`| Email: chiefnayeem@gmail.com         |`);
    console.log(`| URL: http://react-programmers.com    |`);
    Log('warn', `|          ----- V${Config.Version} -----            |`);
    Log('warn', '----------------------------------------');
}

module.exports = PrintAboutFirmWare;