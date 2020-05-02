const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
// const formidableMiddleware = require('express-formidable');

// app.use(formidableMiddleware());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use(express.static(__dirname + "/uploaded"));

//mongomongosetup
var mongosetup = require('./mongo-setting');
mongosetup.setup(app);


var users = require('./modules/users.module');
var products = require('./modules/products.module');
users.initialize(app);
products.initialize(app);

app.listen(8085, () => {
  console.log("Backend is running .....");
});

const fileFilter = (req, file, cb) => {
	// reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype ==='application/pdf') {
	  cb(null, true);
	}else{
	  cb(null, false);
	}
  };
  //upload image 
  const storage_image = multer.diskStorage({
	destination: function (req, file, cb) {
	cb(null, path.resolve(__dirname, './uploaded'))
  },
	filename: function (req, file, cb) {
	var datenow = "scss15";
	//var pastdatetime = nodedatetime.create(datenow);
	cb(null,datenow+"_"+file.originalname)
	}
});
const upload_image = multer({
 storage:storage_image,
  limits: {
	fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// Upload Image
uploadImage = async (files, doc) => {
	if (files.image != null) {
	  var fileExtention = files.image.name.split(".")[1];
	  doc.image = `${doc.id}.${fileExtention}`;
	  var newpath =
		path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
	  if (fs.exists(newpath)) {
		await fs.remove(newpath);
	  }
	  await fs.moveSync(files.image.path, newpath);
  
	  // Update database
	  let result = product.update(
		{ image: doc.image },
		{ where: { id: doc.id } }
	  );
	  return result;
	}
  };

//,upload_image.single('image'),
app.get('/test',async(req,res)=>{
	console.log("is run")
	res.status(200).json({success:true,msg:'API work.',obj:null});
	return;
});

//update profile user 
app.post('/update/profile/user',upload_image.single('profileimage'),(req,res)=>{
	var userid = req.body.userid;
	if(req.file && userid){ 
		console.log(req.file);
		var datenow = date.format(new Date(), 'DMYYYYHHmm').toString();
		console.dir("path : " + datenow+"_"+req.file.originalname);
		var filename = datenow+"_"+req.file.originalname; 
		dbservice.updateprofile(userid,filename)
		.then(function(result){
			return res.end(datenow+"_"+req.file.originalname); 	
		});
	}else{
		console.log(req.file);
		console.log("data no file: " + req.file);
		return res.end('data: invalid file.');
	} 
	});









// app.use("/api/v2/authen/", require("./api_authen"));
// app.use("/api/v2/stock/", require("./api_stock"));