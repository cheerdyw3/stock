const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
	username : String,
	password : String,
	level : String
},{
	timestamps: true
});
module.exports = mongoose.model('users',usersSchema,'users');