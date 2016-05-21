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
var collections=['mCountry','mLocation','mState','mCity'];
var db = mongojs('mongodb://arun:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);

 var sess="";



/*get country type*/
router.get('/getcountry',function(req,res)
{
  console.log("get country")
  db.mCountry.find(req.body,function(err,docs)
  {
     console.log(JSON.stringify(docs))
     res.json(docs);
  });
});
/*end country*/

/*get State type*/
router.get('/getState',function(req,res){
  console.log("get State")
  db.mState.find(req.body,function(err,docs){
     console.log(JSON.stringify(docs))
     res.json(docs);
  });
});
/*end State*/

/*Start City*/
router.get('/getCity',function(req,res){
  console.log("get City")
  db.mCity.find(req.body,function(err,docs){
     console.log(JSON.stringify(docs))
     res.json(docs);
  });
});
/*End City*/


router.post('/addCountry',function(req,res){
  console.log("country list coming in server is"+JSON.stringify(req.body))
  db.mLocation.insert(req.body,function(err,docs){
     console.log("country list inserted is"+JSON.stringify(docs))
     res.json(docs);
  });

});
router.get('/getLocation',function(req,res)
{
  db.mLocation.find({},function(err,docs){
    console.log(JSON.stringify(docs));
    res.json(docs);
  });
});

/*add state*/
router.post('/addState',function(req,res){
  console.log(JSON.stringify(req.body));
db.mLocation.update({"mcountry":req.body.mcountry},{$addToSet:{"mstate":req.body}},function(err,docs){
  console.log(JSON.stringify(docs))
  res.json(docs);
});
});

//add city
router.post('/addCity',function(req,res){
  console.log("data for add city is "+JSON.stringify(req.body));
db.mLocation.update({"mcountry":req.body.mcountry},{$addToSet:{"mcity":req.body}},function(err,docs){
  console.log(JSON.stringify(docs))
  res.json(docs);
});
});
//add city ends

//add building starts here
router.post('/addBuilding',function(req,res){
  console.log("data for add building is "+JSON.stringify(req.body));
db.mLocation.update({"mcountry":req.body.mcountry},{$addToSet:{"mbuilding":req.body}},function(err,docs){
  console.log(JSON.stringify(docs))
  res.json(docs);
});
});
//add building ends here

//add wing starts here
router.post('/addWing',function(req,res){
  console.log("data for add building is "+JSON.stringify(req.body));
db.mLocation.update({"mcountry":req.body.mcountry},{$addToSet:{"mwing":req.body}},function(err,docs){
  console.log(JSON.stringify(docs))
  res.json(docs);
});
});
//add wing ends here

//add floor starts here
router.post('/addFloor',function(req,res){
  console.log("data for add building is "+JSON.stringify(req.body));
db.mLocation.update({"mcountry":req.body.mcountry},{$addToSet:{"mfloor":req.body}},function(err,docs){
  console.log(JSON.stringify(docs))
  res.json(docs);
});
});
//add floor ends here

//remove country from database
router.post('/removeCountry',function(req,res)
{ 
  var id=mongojs.ObjectId(req.body._id);
    db.mLocation.remove({'_id':id},function(err,docs)
    {
           res.json(docs);
    });
});
//remove country from database ends here
module.exports=router;
