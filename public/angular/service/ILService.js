var app=angular.module('app');
app.factory('ILService',function ($http,$window) {
return{

getCompetency:function(){ 
    var promise = $http.get('/getcompetency').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;
},
addLocalIL:function(savedata){
 
    delete savedata.localurl;
    delete savedata.localfile;
    
 

  console.log("savedata::"+JSON.stringify(savedata));
  var promise = $http.post('/addIL',savedata).then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;
},
editLocalIL:function(savedata){
 
    delete savedata.localurl;
    delete savedata.localfile;
    
 

  console.log("editData::"+JSON.stringify(savedata));
  var promise = $http.post('/editIL',savedata).then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;
},
addOnlineIL:function(savedata){
  savedata.filePath=savedata.onlineurl;
    delete savedata.onlineurl;
  console.log("savedata::"+JSON.stringify(savedata));

  var promise = $http.post('/addIL',savedata).then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;
},
getIL:function(activestatus){
  console.log(activestatus);
  if (activestatus==false) {
    var promise = $http.get('/getIL').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }else{
      var promise = $http.get('/getallIL').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }
  
},
activeIL:function(activeitem){
  console.log("Service::"+JSON.stringify(activeitem));
  var promise = $http.post('/statusIL',activeitem).then(function(response){
        return response;
      });
      // Return the promise to the controller
      return promise; 
},
removeIL:function(removeitem){
  var promise = $http.post('/removeIL',removeitem).then(function(response){
        return response;
      });
      // Return the promise to the controller
      return promise; 
},
  
}



});