var app=angular.module('app');
app.factory('AssessmentService',function ($http,$window) {
return{

  getassessment:function(){
    console.log("Get assessment is called in service");
      var promise = $http.get('/getallassessment').then(function(response){
        console.log("Service response for assessment is "+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
},


getSkills:function(){
      var promise = $http.get('/getallSkills').then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
},

getTags:function(){
      var promise = $http.get('/getallTags').then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
},

getComplexity:function(){
      var promise = $http.get('/getallComplexity').then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
},

getQuestion:function(){
      var promise = $http.get('/getallQuestion').then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
}



}
});