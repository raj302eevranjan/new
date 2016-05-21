var express=require('express');
var router=express.Router();
var path=require('path');
var bodyPaser=require('body-parser');
router.use(bodyPaser.json())
var http = require('http');
var mongojs=require('mongojs');
var collections = ["MasterVendorType", "MasterVendorSkillType","m_vendor_country","m_vendor_state"]
var db = mongojs('mongodb://bhuvanesh:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);
// var db1 = mongojs('mongodb://bhuvanesh:123@ds023398.mlab.com:23398/heroku_461p1j1s', );
/*MasterVendorSkillType*/
   /*Vendor type start*/


/*Add Vendor  Start*/
router.post('/addvendor',function(req,res){
	console.log("inside post addvendor")
console.log(req.body);
// var msgg=capitalizeFirstLetter(msg);
//  console.log(msgg);
db.MasterVendorType.insert(req.body,function(err,docs){
	res.json(docs);
});
});
/* end vendor type*/

/*get vendor type*/
router.get('/getvendor',function(req,res){
	console.log("get vendor")
	db.MasterVendorType.find(req.body,function(err,docs){
     console.log(JSON.stringify(docs))
     res.json(docs);
	});
});
/*end vendor type*/


/*check exist start*/

router.post('/checkVendorTypeExist',function(req,res)
{

	 console.log(req.body);
	
	db.MasterVendorType.find({'VendorType':req.body.VendorType},function(err,docs)
	{
        if(docs.length>0)
        { 
        	console.log("exist")
          res.json({'msg':'Value Already Exist!','color':'red'});
         }
       else
       {
       	console.log("available")
       	res.json({'msg':'Available!','color':'green'});


       }
	})
})
/*check exist end*/

/*edit vendor menthod  start*/
router.get('/editVendorTypeValue/:id',function(req,res){
          var id=req.params.id;
          console.log(id);
      db.MasterVendorType.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
        console.log(doc)
          res.json(doc);
      });
});
/* edit vendor method end*/



 /*put vendor type start*/
 router.put('/updatevendortype/:id',function(req,res){
    var id = req.params.id;
    console.log("id"+id)
    console.log("uiyliuhiu"+req.body.vendor);
    db.MasterVendorTypeManagement.findAndModify({query: {_id:mongojs.ObjectId(id)},update : {  $set:{ 
      VendorType:req.body.vendor}},
      new:true},function(err,doc)
      {
        res.json(doc);
      });
 });
 /*put vendor type end*/

/*remove vendor method start*/
router.delete('/deleteVendorTypeValue/:id',function(req,res){
  var id=req.params.id;
  console.log(id);
  db.MasterVendorTypeManagement.remove({_id:mongojs.ObjectId(id)}, function(err,doc)   {
                  res.json(doc);
            });
});
/*remove vendor method end*/

  /*vendor type end*/







  /*skill type start*/


   /*Add skill type  Start*/

router.post('/addskill_type',function(req,res){
  console.log("inside post addskill_type")
   console.log(req.body);

db.MasterVendorSkillType.insert(req.body,function(err,docs){
  res.json(docs);
});
});
/* end skill type*/


/*check skill type exist start*/

router.post('/checkSkillTypeExist',function(req,res)
{

   console.log(req.body);
  
  db.MasterVendorSkillType.find({'SkillType':req.body.SkillType},function(err,docs)
  {
        if(docs.length>0)
        { 
          console.log("exist")
          res.json({'msg':'Value Already Exist!','color':'red'});
         }
       else
       {
        console.log("available")
        res.json({'msg':'Available!','color':'green'});


       }
  })
})
/*check  skill type exist end*/



/*get vendor type*/
router.get('/getskilltype',function(req,res){
  
  db.MasterVendorSkillType.find(req.body,function(err,docs){
     console.log(JSON.stringify(docs))
     res.json(docs);
  });
});
/*end vendor type*/


  /*skil type end*/
/************* VENDOR COUNTRY ************/
router.post('/addvendorcountry',function(req,res){
  console.log(req.body.country);
  db.m_vendor_country.insert({"country":req.body.country},function(err,docs){
  res.json(docs);
});
});
router.post('/updatevendorcountry',function(req,res){
  console.log(req.body.country);
  var event_id=req.body.updateid;
  console.log(event_id);
  db.m_vendor_country.update({_id:mongojs.ObjectId(event_id)}, {$set: {"country":req.body.country}},function(err,udocs){
    console.log(udocs);
    res.json(udocs);
    });
});
router.post('/updatevendorstate',function(req,res){
  console.log(req.body.state);
  var event_id=req.body.updateid;
  console.log(event_id);
  db.m_vendor_state.update({_id:mongojs.ObjectId(event_id)}, {$set: {"state":req.body.state}},function(err,udocs){
    console.log(udocs);
    res.json(udocs);
    });
});
router.post('/removevendorCountry',function(req,res){
  console.log(req.body.country);
  db.m_vendor_country.remove({"country":req.body.country},function(err,docs){
  res.json(docs);
});
});
router.get('/getvendorcountry',function(req,res){
  
  db.m_vendor_country.find(req.body,function(err,docs){
     console.log(JSON.stringify(docs))
     res.json(docs);
  });
});

/***************** VENDOR STATE *******************/
router.get('/getvendorstate',function(req,res){
  
  db.m_vendor_state.find(req.body,function(err,docs){
     console.log(JSON.stringify(docs))
     res.json(docs);
  });
});

router.post('/addvendorstate',function(req,res){
  console.log(req.body);
  db.m_vendor_state.insert({"country":req.body.country,"state":req.body.state},function(err,docs){
  res.json(docs);
});
});

module.exports=router;