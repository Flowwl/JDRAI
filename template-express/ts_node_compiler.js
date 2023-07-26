require('ts-node/register');
require('module-alias/register');
const { connectToDb } = require("./src/database/init");

connectToDb().then()
module.exports = () => {}
