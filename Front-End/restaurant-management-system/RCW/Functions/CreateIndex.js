const fs = require('fs');
const Log = require('./Log.Function');
const templates = require('../Templates/Functions');

/**
 *
 * @param indexFile {string}
 * @param indexType {"config" | "interface" | "function" | "hook" | "middleware" | "serviceProvider" | "store" | "action" | "component" | "layout" | "screen" | "stylesheet"}
 * @param fileNameWithOutExtension {string}
 * @param templateName {string}
 * @constructor
 */
function CreateIndex(indexFile, indexType, fileNameWithOutExtension, templateName) {
    fs.access(indexFile, (error) => {
        if (error && !fs.existsSync(indexFile)) {
            fs.writeFile(indexFile, templates.IndexTemplate(indexType, fileNameWithOutExtension, templateName), function (error) {
                if (error) {
                    Log("error", `Error indexing the module!` + Error);
                } else {
                    Log('warn', `Indexed Successfully!`);
                }
            });
        } else {

            fs.appendFile(indexFile, "\n" + templates.IndexTemplate(indexType, fileNameWithOutExtension, templateName), function (error) {
                if (error) {
                    Log("error", `Error indexing the module!` + Error);
                } else {
                    Log('warn', `Indexed Successfully!`);
                }
            });
        }
    });
}

module.exports = CreateIndex;