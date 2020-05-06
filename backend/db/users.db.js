const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;
const usersModel = require("../models/user.model");

const registerUser = async (data) => {
  try {
    console.log(data)
    data.password = bcrypt.hashSync(data.password, 8);
    let setData = await new usersModel({
      username: data.username,
      password: data.password,
      level: "normal",
    }).save();
    if (setData) {
      return { success: true, msg: `Add User Success.`, obj: setData };
    } else {
      return { success: false, msg: `Add User False.`, obj: null };
    }
  } catch (err) {
    return { success: false, msg: `method db error is ${err}`, obj: null };
  }
};

const checkLogin = async (data) => {
  try {
    let findUser = await usersModel.findOne({'username':data.username});

    if(findUser){
      if (bcrypt.compareSync(data.password, findUser.password)) {
        return { success: true, msg: `ok`, obj: findUser };
      }else{
        return { success: true, msg: `password wrong`, obj: null };
      }
    }else{
      return { success: true, msg: `username wrong`, obj: null };
    }
  } catch (err) {
    return { success: false, msg: `method db error is ${err}`, obj: null };
  }
};

module.exports = {
  registerUser,
  checkLogin
};