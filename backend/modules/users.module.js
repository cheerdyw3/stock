const db = require("../db/users.db");

exports.initialize = (app) => {
  app.post("/authen/register", registerUser);
  app.post("/authen/login", login);
};

const registerUser = async (req, res) => {
  try {
    // if(req.app.locals.authorize == false){
    //     res.status(200).json({success:false,message:"invalid authorization",obj:null});
    //     return;
    // }
    const sendData = await db.registerUser(req.body)
    .then((result) => {
      res.status(200).json(result);
      return;
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: `module error is ${err}`, obj: null });
    return;
  }
};

const login = async (req, res) => {
    try {
      const sendData =await db.checkLogin(req.body)
        .then((result) => {
          res.status(200).json(result);
          return;
        });
    } catch (err) {
      res.status(500).json({ success: false, msg: `module error is ${err}`, obj: null });
      return;
    }
};
