const path = require("path");
const fs = require("fs-extra");
const ObjectId = require("mongoose").Types.ObjectId;
const productModel = require("../models/product.model");

const uploadImage = async (files, doc) => {
  if (files.image != null) {
    let fileExtention = files.image.name.split(".")[1];
    doc.image = `${doc.id}.${fileExtention}`;
    let newpath =
      path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath);

    // Update database
    let result = await productModel.updateOne({'_id':ObjectId(doc._id)},
    {$set:{
        partentName : doc.image
    }});
    return result;
  }
};

const createProduct = async (data,files) => {
  try {
    let setData = await new productModel({
      name: data.name,
      price: data.price,
      stock: data.stock
    }).save();
    setData = await uploadImage(files,setData);


  } catch (err) {
    return { success: false, msg: `method db error is ${err}`, obj: null };
  }
};


module.exports = {
  createProduct
};