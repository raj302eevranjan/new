var app=angular.module('app');
app.factory('mOrgService',function ($http,$window) {
return{
	addEntity:function(data)
	{   data.status=1;
		console.log(JSON.stringify(data));
		var add=$http.post('/addEntity',data).then(function(response)
		{
            return response;
		});
		return add;
	},
	getOrganization:function()
	{
       var get=$http.get('/getOrganization').then(function(response)
       {
        return response;
       });
       return get;
	},
	getAllOrganization:function()
	{
       var get=$http.get('/getAllOrganization').then(function(response)
       {
        return response;
       });
       return get;
	},
	addGroup:function(data)
	{   
		data.status=1;

		console.log(JSON.stringify(data));
		var add=$http.post('/addGroup',data).then(function(response)
		{
            return response;
		});
		return add;
	},
	addFunction:function(data)
	{    data.status=1;
		console.log("Data:"+JSON.stringify(data));
		var add=$http.post('/addFunction',data).then(function(response)
		{
             return response;
		});
		return add;
	},
	addDepartment:function(data)
	{  data.status=1;
		console.log("Data::"+JSON.stringify(data));
		var add=$http.post('/addDepartment',data).then(function(response)
		{
			return response;
		});
		return add;
	},
	activeEntity:function(data)
	{
       if(data.status==1)
       {
       	  data.status=0;
       	  var active=$http.post('/activeEntity',data).then(function(response)
		{
			return response;
		});
		return active;
       }
       else
       { 
       	data.status=1;
        var active=$http.post('/activeEntity',data).then(function(response)
		{
			return response;
		});
		return active;
       }
    },
  updatedata:function(data)
  {  
  	  var update=$http.post('/updatedata',data).then(function(response)
		{
			return response;
		});
  	  return update;

  },
  removeEntity:function(data)
  {
  	var remove=$http.post('/removeEntity',data).then(function(response)
  	{
         return response;
  	});
  	return remove;
  },
  activedata:function(data)
  { 
  	var active=$http.post('/activedata',data).then(function(response)
  	{
  		return response;
  	});
  	return active;
  },
  removedata:function(data)
  {
  	
  	var update=$http.post('/removedata',data).then(function(response)
  	{
  		return response;
  	});
  	return update;
  }

}
});