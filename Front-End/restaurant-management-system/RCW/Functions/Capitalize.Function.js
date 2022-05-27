/**
 * Capitalize a string
 * @param String {string}
 * @constructor
 * @return {string}
 */
function Capitalize(String) {
    return String.charAt(0).toUpperCase() + String.slice(1);
}

module.exports = Capitalize;