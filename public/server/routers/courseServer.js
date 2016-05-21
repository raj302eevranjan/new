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
var db = mongojs('mongodb://arun:123@ds023398.mlab.com:23398/heroku_461p1j1s', ['course_management','mProgramCoordinator']);

 var sess="";

router.post('/upload', function (req,res) {
	console.log(req.body);
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



//CourseILT-Insert Starts
router.post('/addcourse',function(req,res){
	console.log("hhhyes");
console.log(req.body);

db.course_management.insert(req.body,function(err,docs){
	
	res.json(docs);
});
});
//CourseILT-Insert Ends

//CourseILT-Retrieve Starts(ACTIVE ONLY)
router.get('/getcourse',function(req,res){
console.log(req.body);
db.course_management.find({"coursestatus":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//CourseILT-Retrieve Ends
//CourseILT-Retrieve Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallcourse',function(req,res){
db.course_management.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//CourseILT-Retrieve Ends

//CourseILT Edit-Retrieve Starts
router.post('/geteditcourse',function(req,res){
var event_id=mongojs.ObjectId(req.body._id);
db.course_management.find({_id:event_id},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//CourseILT Edit-Retrieve Ends

//CourseILT-Remove Starts
router.post('/removecourse',function(req,res){
	console.log("RemoveCourse");
	var event_id=mongojs.ObjectId(req.body._id);
console.log(req.body);
db.course_management.remove({"_id":event_id},function(err,docs){
	res.json(docs);
});
});
//CourseILT-Remove Ends
//CourseILT-active/inactive Starts
router.post('/statuscourse',function(req,res){
	console.log("hhhyes");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
var updatestatus;
if (req.body.coursestatus==1) {
updatestatus=0;
}else{
updatestatus=1;
}
db.course_management.update({"_id" :event_id	}, {$set: {coursestatus:updatestatus}},function(err,udocs){
	res.json(udocs);
});
});
//CourseILT-active/inactive Ends
//CourseILT-Update Starts
router.post('/updatecourse',function(req,res){
	console.log("UPDATE");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
db.course_management.update({"_id" :event_id}, {$set: 
{"induration":req.body.induration,
"title":req.body.title,
"description":req.body.description,
"duration":req.body.duration,
"prereq":req.body.prereq,
"selectPrereq":req.body.selectPrereq,
"ctrl":req.body.ctrl,
"tags":req.body.tags,
"skills":req.body.skills,
"exmapprove":req.body.exmapprove,
"exmlevel":req.body.exmlevel,
"costapprove":req.body.costapprove,
"costlevel":req.body.costlevel,
"regapprove":req.body.regapprove,
"reglevel":req.body.reglevel,
"relcourse":req.body.relcourse,
"selectRelCourse":req.body.selectRelCourse,
"coursetype":req.body.coursetype,
"coursestatus":req.body.coursestatus,
"addeddate":req.body.addeddate,
"imgname":req.body.imgname,
"imgfile":req.body.imgfile}

},function(err,udocs){
	res.json(udocs);
});
});
//CourseILT-Update Ends



//ILT Session
router.get('/getcoordinator',function(req,res){
console.log(req.body);
db.mProgramCoordinator.find({"status":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});

module.exports=router;
