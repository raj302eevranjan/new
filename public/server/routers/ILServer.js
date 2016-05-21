var express=require('express');
var router=express.Router();
var path=require('path');
var bodyParser=require('body-parser');
router.use(bodyParser.json());

var http = require('http');
var mongojs=require('mongojs');
var session = require('express-session');

var fs = require('fs');



router.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
var db = mongojs('mongodb://arun:123@ds023398.mlab.com:23398/heroku_461p1j1s', ['mCompetency','informalLearning']);

 var sess="";

router.post('/upload', function (req,res) {
var multiparty=require('multiparty');
var form= new multiparty.Form();
var cpath;

form.parse(req,function(err,fields,files){
var img=files.images[0];
var fs=require('fs');
fs.readFile(img.path,function(err,data){
	cpath=__dirname +"/uploads/"+img.originalFilename;
	fs.writeFile(cpath,data,function(error){
		if(error)
			{
				console.log(error);
				res.json({"imgPath":"http://localhost:3000/server/routers/uploads/profile.jpg"});
			}
		else{
		console.log("FInal::"+cpath);
		res.json({"imgPath":"http://localhost:3000/server/routers/uploads/"+img.originalFilename});
		}		
	})
});
})

  form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
        // res.json({"bytesReceived":percent_complete.toFixed(2)});
    });
    


});




//Competency-Retrieve Starts(ACTIVE ONLY)
router.get('/getcompetency',function(req,res){
	console.log("com");
console.log(req.body);
db.mCompetency.find({"status":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});

router.post('/addIL',function(req,res){
console.log(req.body);
req.body.status=1;
db.informalLearning.insert(req.body,function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
router.post('/editIL',function(req,res){
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
console.log("event_id::"+event_id);

db.informalLearning.update({"_id" :event_id	}, {$set:
{
"intellect":req.body.intellect,
"urltype":req.body.urltype,
"activestatus":req.body.activestatus,
"radioStatus":req.body.radioStatus,
"tags":req.body.tags,
"title":req.body.title,
"description":req.body.description,
"competency":req.body.competency,
"sub_competency":req.body.sub_competency,
"skills":req.body.skills,
"uploadType":req.body.uploadType,
"filePath":req.body.filePath
}

},function(err,udocs){
	res.json(udocs);
});
});
router.get('/getIL',function(req,res){
console.log(req.body);
db.informalLearning.find({"status":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//IL-Retrieve Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallIL',function(req,res){
db.informalLearning.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//IL-Retrieve Ends

//IL-active/inactive Starts
router.post('/statusIL',function(req,res){
	console.log("hhhyes");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
var updatestatus;
if (req.body.status==1) {
updatestatus=0;
}else{
updatestatus=1;
}
db.informalLearning.update({"_id" :event_id	}, {$set: {status:updatestatus}},function(err,udocs){
	res.json(udocs);
});
});
//IL-active/inactive Ends
//IL-Remove Starts
router.post('/removeIL',function(req,res){
	console.log("RemoveCourse");
	var event_id=mongojs.ObjectId(req.body._id);
console.log(req.body);
db.informalLearning.remove({"_id":event_id},function(err,docs){
	res.json(docs);
});
});
//IL-Remove Ends
module.exports=router;
