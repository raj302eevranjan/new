var app=angular.module('app');

app.factory('authService',function ($http,$window) {
	return{
		checkExistUser:function(register){
			console.log("authcontroller"+JSON.stringify(register));
		var promise = $http.post('/checkUserExist',register).then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;	

		},
		registerform:function(register){

				var promise = $http.post('/register',register).then(function(response){
		              
		        return response;

		      });
		      // Return the promise to the controller
		      return promise;	
		},
		uploadImage:function(myfile){


						var fd = new FormData();
                          fd.append('images', myfile);


                          var xhr = new XMLHttpRequest();
    
    xhr.open('post', '/upload', true);
    
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {

        var percentage = (e.loaded / e.total) * 100;
        // $('div.progress div.bar').css('width', percentage + '%');
        console.log("Percentage::"+percentage);

      	

      }
    };
    
    xhr.onerror = function(e) {
      // showInfo('An error occurred while submitting the form. Maybe your file is too big');
      console.log("error");
    };
    
    xhr.onload = function() {
      // showInfo(this.statusText);
      console.log("onload");
      console.log(this.statusText);
      
    };
    
    xhr.send(fd);




















				// var promise = $http.post("/upload", fd, {
    //                           withCredentials: false,
    //                           headers: {
    //                             'Content-Type': undefined
    //                           },
    //                           transformRequest: angular.identity,
    //                           params: {
    //                             fd
    //                           },
    //                           // responseType: "arraybuffer"
    //                         })
    //                         .success(function(response, status, headers, config) {
    //                          return response;
    //                         })
    //                         .error(function(error, status, headers, config) {
    //                           console.log(error);
    //                         });
		  //     // Return the promise to the controller
		  //     return promise;	
		},
		checkLoginUser:function(login){
			var promise = $http.post('/checkLoginUser',login).then(function(response){
		        console.log("Final::"+JSON.stringify(response));
		        return response;
		      });
		      // Return the promise to the controller
		      return promise;
		},
		login:function(login){
			var promise = $http.post('/login',login).success(function(response){  
          		console.log(JSON.stringify(response));      
                      return response;
          						});
			

		      // Return the promise to the controller
		      return promise;

		},
		forgetpassword:function(forget){
			// console.log(forget);
			var promise = $http.post('/forgetpassword',forget).success(function(forgetResponse){                 
			        console.log("forget response"+forgetResponse);
			        return forgetResponse;
			      });
		      // Return the promise to the controller
		      return promise;
		},
		recoverpassword:function(password){
			console.log("password"+JSON.stringify(password));
			var promise = $http.post('/recoverpassword',password).success(function(recoverpasswordResponse){                 
			        console.log("recoverpassword response"+recoverpasswordResponse);
			        return recoverpasswordResponse;
			      });
		      // Return the promise to the controller
		      return promise;
		},
		loginverified:function(email){
			console.log("Pass Req"+JSON.stringify(email));
			var promise = $http.post('/loginverified',{"email":email}).success(function(response){                 
			        console.log("response::"+response);
			        return response;
			      });
		      // Return the promise to the controller
		      return promise;
		},
		changepassword:function(passvalue){
			console.log("Pass Req"+JSON.stringify(passvalue));
			var promise = $http.post('/changepassword',passvalue).success(function(response){                 
			        console.log("response::"+response);
			        return response;
			      });
		      // Return the promise to the controller
		      return promise;
		}


		};



		

	

})

