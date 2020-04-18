const ObjectId = require("mongoose").Types.ObjectId;
const productModel = require("../models/product.model");
const formidable = require("formidable");

const createProduct = async (req) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req,async (err,fields,files)=>{
      console.log(files)
    })
    // console.log(form)
    // let setData = await new productModel({
    //   name: data.name,
    //   image: data.image,
    //   price: data.price,
    //   stock: data.stock
    // }).save();
    // console.log(setData)
    // if (setData) {
    //   return { success: true, msg: `Add Product Success.`, obj: setData };
    // } else {
    //   return { success: false, msg: `Add Product False.`, obj: null };
    // }
  } catch (err) {
    return { success: false, msg: `method db error is ${err}`, obj: null };
  }
};


module.exports = {
  createProduct
};