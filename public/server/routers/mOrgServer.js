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
var collections=['mOrganization'];
var db = mongojs('mongodb://bhuvanesh:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);

 var sess="";

 //Add entity
router.post('/addEntity',function(req,res){
db.mOrganization.insert(req.body,function(err,docs){
	console.log(JSON.stringify(docs))
	res.json(docs);
});
});
//add entity End
router.get('/getOrganization',function(req,res)
{
	db.mOrganization.find({},function(err,docs){
		console.log(JSON.stringify(docs));
		res.json(docs);
	});
});
// router.get('/getAllOrganization',function(req,res)
// {
// 	db.mOrganization.find({'status':0},function(err,docs){
// 		console.log(JSON.stringify(docs));
// 		res.json(docs);
// 	});
// });
 //Add Group
router.post('/addGroup',function(req,res){
	console.log(JSON.stringify(req.body));
db.mOrganization.update({"mentity":req.body.mentity},{$addToSet:{"mgroup":req.body}},function(err,docs){
	console.log(JSON.stringify(docs))
	res.json(docs);
});
});
//add Group End
//Add Function
router.post('/addFunction',function(req,res){
	console.log(JSON.stringify(req.body));
db.mOrganization.update({"mentity":req.body.mentity},{$addToSet:{"mfunction":req.body}},function(err,docs){
	console.log(JSON.stringify(docs))
	res.json(docs);
});
});
//add Function End
//Add Department
router.post('/addDepartment',function(req,res){
	console.log(JSON.stringify(req.body));
db.mOrganization.update({"mentity":req.body.mentity},{$addToSet:{"mdepartment":req.body}},function(err,docs){
	console.log(JSON.stringify(docs))
	res.json(docs);
});
});
//add Department End

/*active entity*/
router.post('/activeEntity',function(req,res)
{
	console.log(JSON.stringify(req.body));
	db.mOrganization.update({'mentity':req.body.mentity},{$set:{'status':req.body.status}},function(err,docs)
	{
      console.log(JSON.stringify(docs))
	   res.json(docs);
	});

});
/*end*/
/*update entity*/
router.post('/updatedata',function(req,res)
{
	console.log("updateeeeee");

	var event_id=mongojs.ObjectId(req.body._id);
	
	// var jj=req.body[0];
	// console.log(JSON.stringify(jj));
	console.log(event_id);
	db.mOrganization.update({"_id":event_id},{$set:{'mentity':req.body.mentity,'mgroup':req.body.mgroup,'mfunction':req.body.mfunction,'mdepartment':req.body.mdepartment}},function(err,docs)
	{
      console.log(JSON.stringify(docs))
	   res.json(docs);
	});


});
router.post('/removeEntity',function(req,res)
{
    var id=mongojs.ObjectId(req.body._id);
    db.mOrganization.remove({'_id':id},function(err,docs)
    {
           res.json(docs);
    });
});
router.post('/activedata',function(req,res)
{
  var id=mongojs.ObjectId(req.body._id);
  db.mOrganization.update({"_id":id},{$set:{'mentity':req.body.mentity,'mgroup':req.body.mgroup,'mfunction':req.body.mfunction,'mdepartment':req.body.mdepartment}},function(err,docs)
	{
      console.log(JSON.stringify(docs))
	   res.json(docs);
	});
});

router.post('/removedata',function(req,res)
{
  var id=mongojs.ObjectId(req.body._id);
  db.mOrganization.update({"_id":id},{$set:{'mentity':req.body.mentity,'mgroup':req.body.mgroup,'mfunction':req.body.mfunction,'mdepartment':req.body.mdepartment}},function(err,docs)
	{
      console.log(JSON.stringify(docs))
	   res.json(docs);
	});
});
module.exports=router;