const colors = require('../Config/Colors');

function Log(type, message) {
    if (type === 'error') {
        console.log(colors.FgRed + '%s' + colors.Reset, message);
    } else if (type === 'warn') {
        console.log(colors.FgYellow + '%s' + colors.Reset, message);
    } else if (type === 'success') {
        console.log(colors.FgGreen + '%s' + colors.Reset, message);
    } else if (type === 'react') {
        console.log(colors.FgCyan + '%s' + colors.Reset, message);
    } else if (type === 'violate') {
        console.log(colors.FgMagenta + '%s' + colors.Reset, message);
    }
}

module.exports = Log;
