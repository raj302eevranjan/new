var app=angular.module('app');
app.factory('vendorService',function ($http,$window) {
return{
addVendor:function(savedata){
	savedata.vendorstatus=1;
     savedata.addeddate=new Date();
	var services = $http.post('/addVendordata',savedata).then(function(response)
	{ 
	  
      return response;
      console.log("service"+JSON.stringify(response))
	});
   return services;
},

getVendor:function(activestatus){
  console.log("Service::"+activestatus);
  if (activestatus==false) {
    var promise = $http.get('/getVendordata').then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }else{
      var promise = $http.get('/getallVendor').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }
	
},

getEditCourse:function(passdata){
  console.log("getEditCourse"+passdata);
  var promise = $http.post('/geteditVendor',{"_id":passdata}).then(function(response){
     
        return response;
      });
      
      return promise; 
},

activeVendor:function(activeitem){
  console.log("Service::"+JSON.stringify(activeitem));
	var promise = $http.post('/statusVendor',activeitem).then(function(response){
        return response;
      });
      
      return promise;	
},
updateVendordata:function(savedata){
	
			console.log("VendorService"+JSON.stringify(savedata));
		var promise = $http.post('/updateVendordata',savedata).then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      return promise;	

		},
    updateVendordatas:function(savedata){
  
      console.log("VendorService"+JSON.stringify(savedata));
    var promise = $http.post('/updateVendordatas',savedata).then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      return promise; 

    },
removeVendor:function(id){
	console.log(id);
        var remove=$http.post('/removeVendortype',id).then(function(response){
           console.log("removeVendor response"+JSON.stringify(response));
           return response;
        });
        return remove;
},
 
getCSCLocation:function(searchText){
  console.log(searchText);
  var passdata={"country":searchText};
    var promise = $http.post('/getcsclocation',passdata).then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;
},
getCompetency:function()
{
  var competency=$http.get('/getCompetency').then(function(response)
  {
    return response;
  });
  return competency;
},
getCertification:function()
{
  var certification=$http.post('/getCertification').then(function(response)
  {
    return response;
  });
  return certification;
},
getTags:function()
{
  var data=$http.get('/getTags').then(function(response)
  {
    return response;

  });
  
  return data;
}

}
});