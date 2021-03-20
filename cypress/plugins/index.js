/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {{mkdirpSync?: *, ensureFileSync?: (function(*=): undefined), createSymlinkSync?: (function(*=, *=, *=): (any)), removeSync?: *, emptydirSync?: (function(*=): (*|undefined)), moveSync?: (function(*=, *=, *=): *|undefined), pathExists?: *, ensureDirSync?: *, createFile?: *, createLink?: *, remove?: *, ensureLinkSync?: (function(*=, *=): (any)), writeJson?: *, readJsonSync?: *, outputFile?: *, ensureSymlink?: *, emptyDir?: *, mkdirsSync?: *, writeJsonSync?: *, copy?: *, readJson?: *, write?, ensureFile?: *, ensureSymlinkSync?: (function(*=, *=, *=): (any)), move?: *, read?, ensureLink?: *, createSymlink?: *, ensureDir?: *, copySync?: (function(*=, *=, *=): undefined|*|void), emptyDirSync?: (function(*=): (*|undefined)), mkdirp?: *, createFileSync?: (function(*=): undefined), emptydir?: *, mkdirs?: *, outputFileSync?: (function(*=, ...[*]): (*|undefined)), pathExistsSync?: *, exists?, createLinkSync?: (function(*=, *=): (any)), writev?}|{promises?}}
 */

const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
    const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`);
    if (!fs.existsSync(pathToConfigFile)) {
        return {};
    }
    return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
    const file = config.env.configFile;
    return getConfigurationByFile(file);
}
