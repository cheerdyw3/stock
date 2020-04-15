const mongoose = require('mongoose');
const productsSchema = mongoose.Schema({
	name : String,
	image : String,
	price : Number,
	stock : Number
},{
	timestamps: true
});
module.exports = mongoose.model('products',productsSchema,'products');