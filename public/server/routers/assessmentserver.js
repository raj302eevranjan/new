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
var db = mongojs('frugal', ['skill','tag','complexity','question','assessment']);

 var sess="";

 //Get all the assessment from database
router.get('/getallassessment',function(req,res){
db.assessment.find({},function(err,docs){
	console.log("Assessmentsstatus = "+docs);
	res.json(docs);
});
});
//Getting assessment from database ends here

//Get all the skills from database
router.get('/getallSkills',function(req,res){
db.skill.find({},function(err,docs){
	console.log("skillsstatus = "+docs);
	res.json(docs);
});
});
//Getting skills from database ends here

//Get all the tags from database
router.get('/getallTags',function(req,res){
db.tag.find({},function(err,docs){
	console.log("tagsstatus = "+docs);
	res.json(docs);
});
});
//Getting tags from database ends here

//Get all the tags from database
router.get('/getallComplexity',function(req,res){
db.complexity.find({},function(err,docs){
	res.json(docs);
});
});
//Getting tags from database ends here

//Get all the tags from database
router.get('/getallQuestion',function(req,res){
db.question.find({},function(err,docs){
	res.json(docs);
});
});
//Getting tags from database ends here

module.exports=router;