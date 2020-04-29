const path = require("path");
const fs = require("fs-extra");
const ObjectId = require("mongoose").Types.ObjectId;
const productModel = require("../models/product.model");

const uploadImage = async (files, doc) => {
  if (files.image.name) {
    let fileExtention = files.image.name.split(".")[1];
    doc.image = `${doc.id}.${fileExtention}`;
    let newpath = path.resolve(__dirname) + "./../uploaded/images/" + doc.image;
    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath);

    // Update database
    let result = await productModel.updateOne({'_id':ObjectId(doc.id)},
    {$set:{
      image : doc.image
    }});
    if(result.n != 1){
      return { success: false, msg: `The file has an error.`, obj: null };
    }else{
      return doc;
    }
    
  }else{
    return doc;
  }
};

const createProduct = async (data,files) => {
  try {
    let setData = await new productModel({
      name: data.name,
      price: data.price,
      stock: data.stock
    }).save();
    data.id = setData._id;
    setData = await uploadImage(files,data);
    if (setData) {
      return { success: true, msg: `Add User Success.`, obj: setData };
    } else {
      return { success: false, msg: `Add User False.`, obj: null };
    }
  } catch (err) {
    return { success: false, msg: `method db error is ${err}`, obj: null };
  }
};

const updateProduct = async (data,files) => {
  try {
    let editProduct = await productModel.updateOne({'_id':ObjectId(data.id)},
    {$set:{
      name: data.name,
      price: data.price,
      stock: data.stock
    }});

    editProduct = await uploadImage(files,data);

    if(editProduct){
        return {success:true,message:'ok',obj:editProduct};
    }else{
        return {success:false,message:'edit false',obj:''};
    }
  } catch (err) {
    return { success: false, msg: `method db error is ${err}`, obj: null };
  }
};

const deleteProduct = async(data)=>{
  try {
    let findProduct = await productModel.findOne({'_id':ObjectId(data.id)});
    if(findProduct){
        await fs.remove(
          path.resolve(__dirname) + "./../uploaded/images/" + findProduct.image
        );
        await productModel.deleteOne({'_id':ObjectId(data.id)});
        return { success:true,msg: `ok`,obj:null };
    }else{
      return { success: false, msg: `This ID does not exist.`, obj: null };
    }
  } catch (err) {
    return { success: false, msg: `method db error is ${err}`, obj: null };
  }
}

const getAllProduct = async(req,res)=>{
  try {
    let getAllProduct = await productModel.find({});
    if(getAllProduct){
        return { success:true,msg: `ok`,obj:getAllProduct };
    }else{
      return { success: false, msg: `false.`, obj: null };
    }
  } catch (err) {
    return { success: false, msg: `method db error is ${err}`, obj: null };
  }
}
const getProductById = async (data)=>{
  try {
    let getProductById = await productModel.findOne({'_id':ObjectId(data.id)});
    if(getProductById){
        return { success:true,msg: `ok`,obj:getProductById };
    }else{
      return { success: false, msg: `false.`, obj: null };
    }
  } catch (err) {
    return { success: false, msg: `method db error is ${err}`, obj: null };
  }
}

const getProductByKeyword = async (data)=>{
  try {
    console.log(data.keyword)
    let result = await productModel.find({name: new RegExp(data.keyword, 'i')});
    console.log(result)
    if(result){
        return { success:true,msg: `ok`,obj:result };
    }else{
      return { success: false, msg: `false.`, obj: null };
    }
  } catch (err) {
    return { success: false, msg: `method db error is ${err}`, obj: null };
  }
}


module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  getProductByKeyword
};