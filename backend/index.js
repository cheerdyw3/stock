const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/uploaded"));
app.use(cors());

//mongomongosetup
var mongosetup = require('./mongo-setting');
mongosetup.setup(app);

// app.use("/api/v2/authen/", require("./api_authen"));
// app.use("/api/v2/stock/", require("./api_stock"));

var users = require('./modules/users.module');
var products = require('./modules/products.module');
users.initialize(app);
products.initialize(app);

app.listen(8085, () => {
  console.log("Backend is running .....");
});

app.get('/',async (req,res)=>{
	res.status(200).json({success:true,msg:'API work.',obj:null});
	return;
});