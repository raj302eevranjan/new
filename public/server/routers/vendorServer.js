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
var collections=['vendormanagement','CSCLocation','mCompetency','mCertificate','mTags'];
var db = mongojs('mongodb://bhuvanesh:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);

 var sess="";


//Vendor Post
router.post('/addVendordata',function(req,res){
db.vendormanagement.insert(req.body,function(err,docs){
	console.log(JSON.stringify(docs))
	res.json(docs);
});
});
//Vendor Post End

//Vendor-get Starts(ACTIVE ONLY)
router.get('/getVendordata',function(req,res){
console.log(req.body);
db.vendormanagement.find({"vendorstatus":1},function(err,docs){
	console.log("venuestatus"+docs);
	res.json(docs);
});
});
//Vendor Ends

//Vendor-Retrieve Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallVendor',function(req,res){
db.vendormanagement.find({},function(err,docs){
	console.log("venuestatus"+docs);
	res.json(docs);
});
});
//Vendor-Retrieve Ends
/*get competency*/

router.get('/getCompetency',function(req,res){
db.mCompetency.find({"status":1},function(err,docs){
	console.log("competency"+docs);
	res.json(docs);
});
});
router.post('/getCertification',function(req,res){
	db.mCertificate.find({"status":1},function(err,docs){
		console.log("Certification"+docs);
		res.json(docs);
	});
});
//Vendor Edit-Retrieve Starts
router.post('/geteditVendor',function(req,res){
var event_id=mongojs.ObjectId(req.body._id);
db.vendormanagement.find({_id:event_id},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//CourseILT Edit-Retrieve Ends

// vendor remove start
router.post('/removeVendortype',function(req,res){
	
	console.log(JSON.stringify(req.body._id));
	var id=req.body._id;
	db.vendormanagement.remove({_id:mongojs.ObjectId(id)}, function(err,doc)   {
                  res.json(doc);
            });
});
// vendor reomve end

//Vendor-active/inactive Starts
router.post('/statusVendor',function(req,res){
	console.log("hhhyes");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
var updatestatus;
if (req.body.vendorstatus==1) {
updatestatus=0;
}else{
updatestatus=1;
}
db.vendormanagement.update({"_id" :event_id	}, {$set: {vendorstatus:updatestatus}},function(err,udocs){
	res.json(udocs);
});
});
// Vendor-active/inactive Ends

// Vendor Eqiupement-Update Starts
router.post('/updateVendordata',function(req,res){
	console.log("UPDATE");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
db.vendormanagement.update({"_id" :event_id}, {$set: 
{
"Vendor_Company":req.body.Vendor_Company,
"Address_1":req.body.Address_1,
"Address_2":req.body.Address_2,
"Landmark":req.body.Landmark,
"Country":req.body.Country,
"State":req.body.State,
"City":req.body.City,
"Pincode":req.body.Pincode,
"Empanelment_Date":req.body.Empanelment_Date,
"Projector":req.body.Projector,
"Projector_Screen":req.body.Projector_Screen,
"Audio_Equipments":req.body.Audio_Equipments,
"Printing_Photo_Copy_Machine":req.body.Printing_Photo_Copy_Machine,
"Flip_Board":req.body.Flip_Board,
"Pan_Card":req.body.Pan_Card,
"TIN_Number":req.body.TIN_Number,
"TAN_Number":req.body.TAN_Number,
"Service_Tax_Number":req.body.Service_Tax_Number,
"Firstname":req.body.Firstname,
"Middlename":req.body.Middlename,
"Lastname":req.body.Lastname,
"Job_Title":req.body.Job_Title,
"email_id":req.body.email_id,
"Phonenumber":req.body.Phonenumber,
"venuetype":req.body.venuetype,
"vendorstatus":req.body.vendorstatus,
"addeddate":req.body.addeddate,
"vendortype":req.body.vendortype,
}

},function(err,udocs){
	res.json(udocs);
});
});

// edit ILT,Mlearn,Elearn
router.post('/updateVendordatas',function(req,res){
	console.log("UPDATE");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
db.vendormanagement.update({"_id" :event_id}, {$set: 
{
"Vendor_Company":req.body.Vendor_Company,
"Address_1":req.body.Address_1,
"Address_2":req.body.Address_2,
"Landmark":req.body.Landmark,
"Country":req.body.Country,
"State":req.body.State,
"City":req.body.City,
"Pincode":req.body.Pincode,
"Empanelment_Date":req.body.Empanelment_Date,
"selectCertification_data":req.body.selectCertification_data,
"selectCompetency_data":req.body.selectCompetency_data,
"Pan_Card":req.body.Pan_Card,
"TIN_Number":req.body.TIN_Number,
"TAN_Number":req.body.TAN_Number,
"Service_Tax_Number":req.body.Service_Tax_Number,
"Firstname":req.body.Firstname,
"Middlename":req.body.Middlename,
"Lastname":req.body.Lastname,
"Job_Title":req.body.Job_Title,
"email_id":req.body.email_id,
"Phonenumber":req.body.Phonenumber,
"venuetype":req.body.venuetype,
"vendorstatus":req.body.vendorstatus,
"addeddate":req.body.addeddate,
"vendortype":req.body.vendortype,
}

},function(err,udocs){
	res.json(udocs);
});
});
// edit f&b vendor
router.post('/updateVendordatas',function(req,res){
	console.log("UPDATE");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
db.vendormanagement.update({"_id" :event_id}, {$set: 
{
"Vendor_Company":req.body.Vendor_Company,
"Address_1":req.body.Address_1,
"Address_2":req.body.Address_2,
"Landmark":req.body.Landmark,
"Country":req.body.Country,
"State":req.body.State,
"City":req.body.City,
"Pincode":req.body.Pincode,
"Empanelment_Date":req.body.Empanelment_Date,
"Supplies_Veg_Food":req.body.Supplies_Veg_Food,
"Supplies_Non_Veg_Food":req.body.Supplies_Non_Veg_Food,
"tags":req.body.tags,
"Supplies_Water":req.body.Supplies_Water,
"Supplies_Beverages":req.body.Supplies_Beverages,
"Pan_Card":req.body.Pan_Card,
"TIN_Number":req.body.TIN_Number,
"TAN_Number":req.body.TAN_Number,
"Service_Tax_Number":req.body.Service_Tax_Number,
"Firstname":req.body.Firstname,
"Middlename":req.body.Middlename,
"Lastname":req.body.Lastname,
"Job_Title":req.body.Job_Title,
"email_id":req.body.email_id,
"Phonenumber":req.body.Phonenumber,
"venuetype":req.body.venuetype,
"vendorstatus":req.body.vendorstatus,
"addeddate":req.body.addeddate,
"vendortype":req.body.vendortype,
}

},function(err,udocs){
	res.json(udocs);
});
});
// edit Travel vendor
router.post('/updateVendordatas',function(req,res){
	console.log("UPDATE");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
db.vendormanagement.update({"_id" :event_id}, {$set: 
{
"Vendor_Company":req.body.Vendor_Company,
"Address_1":req.body.Address_1,
"Address_2":req.body.Address_2,
"Landmark":req.body.Landmark,
"Country":req.body.Country,
"State":req.body.State,
"City":req.body.City,
"Pincode":req.body.Pincode,
"Empanelment_Date":req.body.Empanelment_Date,
"Domestic_Travel":req.body.Domestic_Travel,
"International_Travel":req.body.International_Travel,
"Hotel_Accomodation_Domestic":req.body.Hotel_Accomodation_Domestic,
"Hotel_Accomodation_International":req.body.Hotel_Accomodation_International,
"Printing_Photo_Copy_Machine":req.body.Printing_Photo_Copy_Machine,
"Visa":req.body.Visa,
"Travel_Insurance":req.body.Travel_Insurance,
"Foreign_Currency":req.body.Foreign_Currency,
"Service_Cab_Services":req.body.Cab_Services,
"Pan_Card":req.body.Pan_Card,
"TIN_Number":req.body.TIN_Number,
"TAN_Number":req.body.TAN_Number,
"Service_Tax_Number":req.body.Service_Tax_Number,
"Firstname":req.body.Firstname,
"Middlename":req.body.Middlename,
"Lastname":req.body.Lastname,
"Job_Title":req.body.Job_Title,
"email_id":req.body.email_id,
"Phonenumber":req.body.Phonenumber,
"venuetype":req.body.venuetype,
"vendorstatus":req.body.vendorstatus,
"addeddate":req.body.addeddate,
"vendortype":req.body.vendortype,
}

},function(err,udocs){
	res.json(udocs);
});
});

//CSCLocation get starts
router.post('/getcsclocation',function(req,res){
	console.log(req.body);
db.CSCLocation.find(req.body,function(err,docs){
	console.log(docs);
	res.json(docs);
});
});

router.get('/getTags',function(req,res){
	db.mTags.find({},function(err,docs){
		console.log("getTags"+JSON.stringify(docs));
		res.json(docs);
	});
});

//edit printing vendor
// Vendor Eqiupement-Update Starts
router.post('/updateVendordata',function(req,res){
	console.log("UPDATE");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
db.vendormanagement.update({"_id" :event_id}, {$set: 
{
"Vendor_Company":req.body.Vendor_Company,
"Address_1":req.body.Address_1,
"Address_2":req.body.Address_2,
"Landmark":req.body.Landmark,
"Country":req.body.Country,
"State":req.body.State,
"City":req.body.City,
"Pincode":req.body.Pincode,
"Empanelment_Date":req.body.Empanelment_Date,
"BWPrinting":req.body.BWPrinting,
"ColorPrinting":req.body.ColorPrinting,
"Binding":req.body.Binding,
"PhotoCopying":req.body.PhotoCopying,
"Lamination":req.body.Lamination,
"Pan_Card":req.body.Pan_Card,
"TIN_Number":req.body.TIN_Number,
"TAN_Number":req.body.TAN_Number,
"Service_Tax_Number":req.body.Service_Tax_Number,
"Firstname":req.body.Firstname,
"Middlename":req.body.Middlename,
"Lastname":req.body.Lastname,
"Job_Title":req.body.Job_Title,
"email_id":req.body.email_id,
"Phonenumber":req.body.Phonenumber,
"venuetype":req.body.venuetype,
"vendorstatus":req.body.vendorstatus,
"addeddate":req.body.addeddate,
"vendortype":req.body.vendortype,
}

},function(err,udocs){
	res.json(udocs);
});
});
// end

// edit stationary
router.post('/updateVendordatas',function(req,res){
	console.log("UPDATE");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
db.vendormanagement.update({"_id" :event_id}, {$set: 
{
"Vendor_Company":req.body.Vendor_Company,
"Address_1":req.body.Address_1,
"Address_2":req.body.Address_2,
"Landmark":req.body.Landmark,
"Country":req.body.Country,
"State":req.body.State,
"City":req.body.City,
"Pincode":req.body.Pincode,
"Empanelment_Date":req.body.Empanelment_Date,
"Pan_Card":req.body.Pan_Card,
"TIN_Number":req.body.TIN_Number,
"TAN_Number":req.body.TAN_Number,
"Service_Tax_Number":req.body.Service_Tax_Number,
"Firstname":req.body.Firstname,
"Middlename":req.body.Middlename,
"Lastname":req.body.Lastname,
"Job_Title":req.body.Job_Title,
"email_id":req.body.email_id,
"Phonenumber":req.body.Phonenumber,
"venuetype":req.body.venuetype,
"vendorstatus":req.body.vendorstatus,
"addeddate":req.body.addeddate,
"vendortype":req.body.vendortype,
}

},function(err,udocs){
	res.json(udocs);
});
});
module.exports=router;
