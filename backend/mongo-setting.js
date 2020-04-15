const mongoose = require('mongoose');
const initconf = require('./init.config.json');
var url = 'mongodb://'+initconf.DATABASEHOST+':'+initconf.DATABASEPORT+'/'+initconf.DATABASENAME;
const authSources = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource:'admin'
};

exports.setup = function (app){
 mongoose.Promise = global.Promise;
 mongoose.connect(url,authSources).then(() => {
     console.log("Successfully connected to the databass");    
 }).catch(err => {
     console.log('Could not connect to the database business Exiting now...\n'+err+JSON.stringify(err, undefined, 2));
     process.exit();
 });
}
