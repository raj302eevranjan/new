var app=angular.module('app');
app.factory('mLocationService',function ($http,$window) {
return{
	addCountry:function(data)
	{   data.status=1;
		console.log(JSON.stringify(data));
		var add=$http.post('/addCountry',data).then(function(response)
		{
            return response;
		});
		return add;
	},
	getLocation:function()
	{
       var get=$http.get('/getLocation').then(function(response)
       {
        return response;
       });
       return get;
	},
	addState:function(data)
	{
		data.status=1;

		console.log(JSON.stringify(data));
		var add=$http.post('/addState',data).then(function(response)
		{
            return response;
		});
		return add;
	},
	addCity:function(data)
	{   data.status=1;
		console.log("data coming form add city function is "+JSON.stringify(data));
		var add=$http.post('/addCity',data).then(function(response)
		{
            return response;
		});
		return add;
	},
	addBuilding:function(data)
	{   data.status=1;
		console.log("data coming form add building function is "+JSON.stringify(data));
		var add=$http.post('/addBuilding',data).then(function(response)
		{
            return response;
		});
		return add;
	},
	addWing:function(data)
	{   data.status=1;
		console.log("data coming form add building function is "+JSON.stringify(data));
		var add=$http.post('/addWing',data).then(function(response)
		{
            return response;
		});
		return add;
	},
	addFloor:function(data)
	{   data.status=1;
		console.log("data coming form add floor function is "+JSON.stringify(data));
		var add=$http.post('/addFloor',data).then(function(response)
		{
            return response;
		});
		return add;
	},
	removeCountry:function(data)
	{ 
		var remove=$http.post('/removeCountry',data).then(function(response)
		{
            return response;
		});
		return remove;
	}
}
});