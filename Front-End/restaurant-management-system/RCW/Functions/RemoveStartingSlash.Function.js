/**
 * Remove the starting Slash of a string
 * @param string {string}
 * @returns {*}
 * @constructor
 */
function RemoveStartingSlash(string) {
    return string.substr(string.indexOf('/') + 1);
}

module.exports = RemoveStartingSlash;