var express = require('express');
var router = express.Router();
var fs = require('fs');
var qrImage = require ('qr-image');
var path = require('path');
var mng = require('mongodb');
var url = 'mongodb://sarthak:12345noni@ds117148.mlab.com:17148/hungermanager';
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var CreateUserService =  require('./backend services/CreateUserService').default;

router.use(bodyParser.urlencoded({
  'extended': 'true'
}));
router.use(bodyParser.json());

router.use(fileUpload());


router.get('/', function (req, res) {
  res.sendFile(path.resolve('./public/views/index.html'));
});


router.post("/createUser", function (req, res) {
  console.log(req.body);
  // CreateUserService.demofunc();
  // res.json({msg : "hello world from server"});
  var found = true;
  let profile_image;
  if (!req.files) {
    profile_image = "null";
  } else {
    profile_image = req.files.profile_image;
  }

  // console.log(req.files.profile_image);
  // console.log(profile_image);/\\\

  mng.connect(url, {
    uri_decode_auth: true
  }, function (err, db) {

    if (err) throw err;

    var data = db.db("hungermanager");

    data.collection("lol").find({
      $or: [{
        email: req.body.email
      }, {
        mobile: req.body.mobile
      }]
    }).toArray(function (err, result) {
      if (err) throw err;
      // console.log("**********************************");
      if (result.length <= 0) {
        found = false;
        console.log(result + "angel");

        // Use the mv() method to place the file somewhere on your server
        if (profile_image == null) {
          console.log("no files were uploaded");
        } else {
          profile_image.mv('./public/media/' + req.body.email.split("@")[0], function (err) {
            if (err)
              return res.json({
                error: true,
                mssg: err
              });

          });
        }
        data.collection("lol").insertOne(req.body, function (err, result) {
          if (err) throw err;
          console.log("Inserted");
          console.log(result.result.ok);
          res.json({
            error: false,
            mssg: result.result
          });
        });

      } else {

        res.json({
          error: true,
          mssg: result[0]
        });
      }
    });
  });
});

router.post("/validateLogin", function (req, res) {
  console.log(req.body);

  mng.connect(url, {
    uri_decode_auth: true
  }, function (err, db) {

    if (err) throw err;

    var data = db.db("hungermanager");

    data.collection("lol").find({
      rollno: req.body.rollno
    }).toArray(function (err, result) {
      if (err) throw err;

      if (result.length > 0 && result[0].password == req.body.password) {
        console.log("record found");
        console.log(result[0]);
        result[0].ok = 1;
        res.send(result[0]);

      } else {
        console.log("not found");
        console.log(result);
        var result1 = {
          ok: 0
        };
        res.send(result1);
      }
    });
  });
});





router.post("/bookmeal", (req, res) => {
  console.log(req.body);
  mng.connect(url, {
    uri_decode_auth: true
  }, function (err, db) {

    if (err) throw err;

    var data = db.db("hungermanager");

    data.collection("messmanager").find({
    
        unique_id: req.body.unique_id
      
    }).toArray(function (err, result) {
      if (err) throw err;
      // console.log("**********************************");
      if (result.length <= 0) {
        let final_qr_url="";
        found = false;
        console.log(result + "angel");

        // Use the mv() method to place the file somewhere on your server
        
        data.collection("messmanager").insertOne(req.body, function (err, result) {
          if (err) throw err;
          console.log("Inserted");
          console.log(result.result.ok);
           final_qr_url = req.body.unique_id;
          final_qr_url = final_qr_url.replace(/\//g,'')
          res.json({
            error: false,
            mssg: result.result,
            found : false,
            locationQr : "public/media/"+final_qr_url
          });
        });
        qrImage
		.image(req.body.unique_id, {type:'png',size:20})
		.pipe(fs.createWriteStream("public/media/"+req.body.unique_id.replace(/\//g,'')));

      } else {
        console.log("already exixts");
        res.json({
          error: true,
          mssg: result[0],
          found : true
        });
      }
    });
  });
  // res.json({data:"hellowolrd"});
});

module.exports = router;