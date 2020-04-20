const db = require("../db/products.db");

exports.initialize = (app) => {
  app.post("/product", createProduct);
  app.put("/product", updateProduct);
  app.delete("/product/:id", deleteProduct);
  app.get("/product/keyword/:keyword", getProductByKeyword);
  app.get("/product/:id", getProductById);
  app.get("/product", getAllProduct);
};

const createProduct = async (req, res) => {
  try {
    const sendData = await db.createProduct(req.fields,req.files)
    .then((result) => {
      res.status(200).json(result);
      return;
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: `module error is ${err}`, obj: null });
    return;
  }
};

const updateProduct = async (req, res) => {
}
const deleteProduct = async (req, res) => {
}
const getProductByKeyword = async (req, res) => {
}
const getProductById = async (req, res) => {
}
const getAllProduct = async (req, res) => {
}
