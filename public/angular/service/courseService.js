var app=angular.module('app');
app.factory('courseService',function ($http,$window) {
return{
addCourse:function(savedata){
			console.log("courseService"+JSON.stringify(savedata));
			savedata.coursetype="ELearn";
			savedata.coursestatus=1;
			savedata.addeddate=new Date();
		var promise = $http.post('/addcourse',savedata).then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;

		},
getCourse:function(activestatus){
  console.log("Service::"+activestatus);
  if (activestatus==false) {
    var promise = $http.get('/getcourse').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }else{
      var promise = $http.get('/getallcourse').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }
	
},

getEditCourse:function(passdata){
  console.log("getEditCourse"+passdata);
  var promise = $http.post('/geteditcourse',{"_id":passdata}).then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
},
removeCourse:function(removeitem){
	var promise = $http.post('/removecourse',removeitem).then(function(response){
        return response;
      });
      // Return the promise to the controller
      return promise;	
},
activeCourse:function(activeitem){
	var promise = $http.post('/statuscourse',activeitem).then(function(response){
        return response;
      });
      // Return the promise to the controller
      return promise;	
},
updateCourse:function(savedata){
			console.log("courseService"+JSON.stringify(savedata));
			savedata.coursetype="ILT";
			savedata.coursestatus=1;
		var promise = $http.post('/updatecourse',savedata).then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;	

		},
//add ILTSession ServiceCall
    getProgramCoordinator:function(){
      console.log("getProgramCoordinator");
  var promise = $http.get('/getcoordinator').then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
},
}







});