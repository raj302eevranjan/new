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
var db = mongojs('mongodb://arun:123@ds023398.mlab.com:23398/heroku_461p1j1s', ['venuemanagement','CSCLocation']);

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

//Venue-Insert Starts
router.post('/addvenue',function(req,res){
console.log(req.body);
db.venuemanagement.insert(req.body,function(err,docs){
	res.json(docs);
});
});
//Venue-Insert Ends

//CourseILT-Retrieve Starts(ACTIVE ONLY)
router.get('/getvenue',function(req,res){
console.log(req.body);
db.venuemanagement.find({"venuestatus":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//CourseILT-Retrieve Ends
//CourseILT-Retrieve Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallvenue',function(req,res){
db.venuemanagement.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//CourseILT-Retrieve Ends

//CourseILT Edit-Retrieve Starts
router.post('/geteditvenue',function(req,res){
var event_id=mongojs.ObjectId(req.body._id);
db.venuemanagement.find({_id:event_id},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//CourseILT Edit-Retrieve Ends

//CourseILT-Remove Starts
router.post('/removevenue',function(req,res){
	console.log("RemoveCourse");
	var event_id=mongojs.ObjectId(req.body._id);
console.log(req.body);
db.venuemanagement.remove({"_id":event_id},function(err,docs){
	res.json(docs);
});
});
//CourseILT-Remove Ends
//Venue-active/inactive Starts
router.post('/statusvenue',function(req,res){
	console.log("hhhyes");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
var updatestatus;
if (req.body.venuestatus==1) {
updatestatus=0;
}else{
updatestatus=1;
}
db.venuemanagement.update({"_id" :event_id	}, {$set: {venuestatus:updatestatus}},function(err,udocs){
	res.json(udocs);
});
});
//Venue-active/inactive Ends
//CourseILT-Update Starts
router.post('/updatevenue',function(req,res){
	console.log("UPDATE");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
db.venuemanagement.update({"_id" :event_id}, {$set: 
{"venue":req.body.venue,
"room":req.body.room,
"capacity":req.body.capacity,
"roomtype":req.body.roomtype,
"projector":req.body.projector,
"whiteboard":req.body.whiteboard,
"add1":req.body.add1,
"add2":req.body.add2,
"country":req.body.country,
"state":req.body.state,
"city":req.body.city,
"building":req.body.building,
"floor":req.body.floor,
"wing":req.body.wing,
"pincode":req.body.pincode,
"firstname":req.body.firstname,
"middlename":req.body.middlename,
"lastname":req.body.lastname,
"emailid":req.body.emailid,
"phonenumber":req.body.phonenumber,
"venuetype":req.body.venuetype,
"venuestatus":req.body.venuestatus,
"addeddate":req.body.addeddate,
"flipboard":req.body.flipboard,
"internet":req.body.internet}

},function(err,udocs){
	res.json(udocs);
});
});
//CourseILT-Update Ends

//CSCLocation get starts
router.post('/getcsclocation',function(req,res){
	console.log(req.body);
db.CSCLocation.find(req.body,function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//CSCLocation get ends
module.exports=router;
