var app=angular.module('app');
app.factory('venueService',function ($http,$window) {
return{
addVenue:function(savedata){
			console.log("venueService"+JSON.stringify(savedata));
			savedata.venuestatus=1;
			savedata.addeddate=new Date();
		var promise = $http.post('/addvenue',savedata).then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;

		},
getVenue:function(activestatus){
  console.log("Service::"+activestatus);
  if (activestatus==false) {
    var promise = $http.get('/getvenue').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }else{
      var promise = $http.get('/getallvenue').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }
	
},

getEditCourse:function(passdata){
  console.log("getEditCourse"+passdata);
  var promise = $http.post('/geteditvenue',{"_id":passdata}).then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
},
removeVenue:function(removeitem){
	var promise = $http.post('/removevenue',removeitem).then(function(response){
        return response;
      });
      // Return the promise to the controller
      return promise;	
},
activeVenue:function(activeitem){
  console.log("Service::"+JSON.stringify(activeitem));
	var promise = $http.post('/statusvenue',activeitem).then(function(response){
        return response;
      });
      // Return the promise to the controller
      return promise;	
},
updateVenue:function(savedata){
			console.log("venueService"+JSON.stringify(savedata));
		var promise = $http.post('/updatevenue',savedata).then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;	

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
}

}



});