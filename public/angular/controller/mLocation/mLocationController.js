var app=angular.module("app");
app.controller("locationCtrl",function($scope,$location,$filter,mLocationService)
{  
 $scope.masters=['Country','State','City','Building','Wing','Floor'];

$scope.editcountry=1;
 var self = this; 
 self.dis_state = true;
 self.dis_city = true;
 self.dis_building = true;
 self.dis_wing = true;
$scope.dis_state=true;
$scope.editstate=1;
$scope.action_name="Add";
// Country
    self.querySearchCountry   = querySearchCountry;
    self.selectedCountryChange = selectedCountryChange;
    self.searchCountryChange   = searchCountryChange;
//state
     self.searchStateChange   = searchStateChange;
     self.selectedStateChange   = selectedStateChange;
     self.querySearchState   = querySearchState;
//city
     self.searchCityChange   = searchCityChange;
     self.selectedCityChange   = selectedCityChange;
     self.querySearchCity   = querySearchCity;
//building
     self.searchBuildingChange   = searchBuildingChange;
     self.selectedBuildingChange   = selectedBuildingChange;
     self.querySearchBuilding   = querySearchBuilding;
//wing
     self.searchWingChange   = searchWingChange;
     self.selectedWingChange   = selectedWingChange;
     self.querySearchWing   = querySearchWing;
$scope.addCountry=function(mcountry)
  {
    console.log("mcountry"+JSON.stringify(mcountry));
    if($scope.action_name=="Add")
    { 
      console.log("Add");
      var data={};
      data.mcountry=mcountry;
        mLocationService.addCountry(data).then(function(response)
        {   $scope.mcountry="";
            $scope.getLocation();  
            console.log(JSON.stringify(response));
        });
   }
   else
   { 
  //   console.log("Update")
  //  $scope.mOrganizationdata= $scope.mOrganization;
  // // $scope.mOrganization.mentity
  //  for(var i=0;i<$scope.mOrganizationdata.length;i++)
  //  {     
  //   console.log("data id::"+JSON.stringify($scope.mOrganizationdata[i]._id));
  //      if($scope.mOrganizationdata[i]._id == $scope.entity_id)
  //      {
  //     $scope.mOrganizationdata[i].mentity=mentity;
  //    if($scope.mOrganizationdata[i].mgroup)
  //    {  
  //     for(var j=0;j<$scope.mOrganizationdata[i].mgroup.length;j++)
  //     { 
  //       console.log("Group enttity data"+JSON.stringify($scope.mOrganizationdata[i].mgroup[j].mentity))
  //       $scope.mOrganizationdata[i].mgroup[j].mentity=mentity;
  //       $scope.changed=$scope.mOrganizationdata[i].mgroup;
  //     }

  //     }
  //     if($scope.mOrganizationdata[i].mfunction)
  //     {
  //       for(var k=0;k<$scope.mOrganizationdata[i].mfunction.length;k++)
  //       {
  //         console.log("Function enttity data"+JSON.stringify($scope.mOrganizationdata[i].mfunction[k].mentity))
  //       $scope.mOrganizationdata[i].mfunction[k].mentity=mentity;
  //       }
  //     }
  //     if($scope.mOrganizationdata[i].mdepartment)
  //     {
  //       for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
  //       {
  //         console.log("Department enttity data"+JSON.stringify($scope.mOrganizationdata[i].mdepartment[l].mentity))
  //       $scope.mOrganizationdata[i].mdepartment[l].mentity=mentity;
  //       $scope.changeddata=$scope.mOrganizationdata[i];
       
  //       }
  //     }
      
  //  console.log("changeddata"+JSON.stringify($scope.changeddata)); 
  //   mOrgService.updatedata($scope.changeddata).then(function(response)
  //   {
  //     console.log(JSON.stringify(response));
  //      $scope.getOrganization();
  //     $scope.mentity="";
  //     $scope.action_name="Add";
  //     $scope.editentity=1;
  //    });
  //    };
      
    // }
   }
   

   }



/*2*/
/*ADD State*/
 $scope.getCountrydata=function(getResponse)
   {
      $scope.CountryList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
       if ($scope.CountryList.indexOf(getResponse[i].mcountry) == -1) 
        {
         $scope.CountryList.push(getResponse[i].mcountry);
        }
     }
       console.log("Country List::"+$scope.CountryList);
      self.Countrydata=$scope.CountryList;
   }
function querySearchCountry (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Countrydata));
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Countrydata.filter( createFilterFor(query) ) : self.Countrydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchCountryChange(text)
    {    
      $scope.Country=LocationResponse;
              console.log('Text changed to ' + text);
       
    }
  function selectedCountryChange(item) {
    console.log("Item"+JSON.stringify(item));
    $scope.selectedCountrydata=item;
    if(item ==undefined)
    {    
          $scope.Country=LocationResponse;
           
           // $scope.dis_state=true;
           // $scope.dis_function=true;   
           // self.selectedState="";
           // self.searchState="";
           // $scope.StateList="";
           $scope.mState="";
           // self.selectedFunction="";
          // self.searchFunction="";

    }
   else
      { 
        self.dis_state = false;
      self.selectedCountry=item;
       $scope.getStatedata(self.selectedCountry,LocationResponse)
     }
    }
 $scope.addState=function()
  {  
    if($scope.action_name=="Add")
    {
    var data={};
   data.mcountry=$scope.selectedCountrydata;
   data.mstate=$scope.mstate;
   console.log("AddGroup::"+JSON.stringify(data));
    mLocationService.addState(data).then(function(response)
    {    self.searchCountry="";
        self.selectedCountry="";
        $scope.mstate="";
        console.log(JSON.stringify(response));
        $scope.getLocation();
    });
   }
   else
   {
    $scope.getid($scope.passgroupdata);
    $scope.mOrganizationdata= $scope.mOrganization;
    $scope.mOrganizationdata.id=$scope.data_id;
     console.log("Update data"+JSON.stringify($scope.mOrganizationdata));
   // $scope.mOrganization.mentity
   for(var i=0;i<$scope.mOrganizationdata.length;i++)
   {     
    console.log("data id::"+JSON.stringify($scope.mOrganizationdata[i]._id));
    console.log("id::"+JSON.stringify($scope.data_id))
       if($scope.mOrganizationdata[i]._id == $scope.data_id)
       {  
     if($scope.mOrganizationdata[i].mgroup)
     {  
      for(var j=0;j<$scope.mOrganizationdata[i].mgroup.length;j++)
      { 
        if($scope.mOrganizationdata[i].mgroup[j].mgroup==$scope.GroupEditdata)
        {
          $scope.mOrganizationdata[i].mgroup[j].mgroup=$scope.mgroup;
        } 
      }
      }
      if($scope.mOrganizationdata[i].mfunction)
      {
        for(var k=0;k<$scope.mOrganizationdata[i].mfunction.length;k++)
                  if($scope.mOrganizationdata[i].mfunction[k].mgroup==$scope.GroupEditdata)
        {
          $scope.mOrganizationdata[i].mfunction[k].mgroup=$scope.mgroup;
        }
        }
      }
      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
           if($scope.mOrganizationdata[i].mdepartment[l].mgroup==$scope.GroupEditdata)
        {
          $scope.mOrganizationdata[i].mdepartment[l].mgroup=$scope.mgroup;
        }
        $scope.changeddata=$scope.mOrganizationdata[i];
       
        }
      }
    mOrgService.updatedata($scope.changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
       $scope.getOrganization();
        $scope.editgroup=1;
        self.searchEntity="";
        self.selectedEntity="";
        $scope.mgroup=""; 
        $scope.dis_entity=false;
     });
     };      
  }
   }

   $scope.addCity=function()
  {  
    if($scope.action_name=="Add")
    {
    var data={};
   data.mcountry=$scope.selectedCountrydata;
   data.mstate=$scope.selectedStatedata;
   data.mcity=$scope.mcity;
   console.log("AddState::"+JSON.stringify(data));
    mLocationService.addCity(data).then(function(response)
    {    //self.searchCountry="";
        //self.selectedCountry="";
        //$scope.mstate="";
        console.log("response received after addcity function"+JSON.stringify(response));
        //$scope.getLocation();
    });
   }
  
   }

     $scope.addBuilding=function()
  {  
    if($scope.action_name=="Add")
    {
    var data={};
   data.mcountry=$scope.selectedCountrydata;
   data.mstate=$scope.selectedStatedata;
   data.mcity=$scope.selectedCitydata;
   data.mbuilding=$scope.mbuilding;
   console.log("Addbuiling::"+JSON.stringify(data));
    mLocationService.addBuilding(data).then(function(response)
    {    //self.searchCountry="";
        //self.selectedCountry="";
        //$scope.mstate="";
        console.log("response received after addbuilding function"+JSON.stringify(response));
        //$scope.getLocation();
    });
   }
  
   }

        $scope.addWing=function()
  { 
    if($scope.action_name=="Add")
    {
    var data={};
   data.mcountry=$scope.selectedCountrydata;
   data.mstate=$scope.selectedStatedata;
   data.mcity=$scope.selectedCitydata;
   data.mbuilding=$scope.selectedBuildingdata;
   data.mwing=$scope.mwing;
   console.log("Addwing::"+JSON.stringify(data));
    mLocationService.addWing(data).then(function(response)
    {    //self.searchCountry="";
        //self.selectedCountry="";
        //$scope.mstate="";
        console.log("response received after addbuilding function"+JSON.stringify(response));
        //$scope.getLocation();
    });
   }
  
   }

   $scope.addFloor=function()
  { 
    if($scope.action_name=="Add")
    {
    var data={};
   data.mcountry=$scope.selectedCountrydata;
   data.mstate=$scope.selectedStatedata;
   data.mcity=$scope.selectedCitydata;
   data.mbuilding=$scope.selectedBuildingdata;
   data.mwing=$scope.selectedWingdata;
   data.floor = $scope.mfloor;
   console.log("addFloor::"+JSON.stringify(data));
    mLocationService.addFloor(data).then(function(response)
    {    //self.searchCountry="";
        //self.selectedCountry="";
        //$scope.mstate="";
        console.log("response received after addfloor function"+JSON.stringify(response));
        //$scope.getLocation();
    });
   }
  
   }




//autocomplete functions for state
   $scope.getStatedata=function(Selecteditem,getResponse)
   {
       $scope.StateList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
      console.log(JSON.stringify("The country selected is ::"+Selecteditem))
      if(getResponse[i].mcountry==Selecteditem)
      { 
       
        
         if (getResponse[i].mstate) 
          {  
             console.log("State length::"+JSON.stringify(getResponse[i].mstate.length))
            for(j=0;j<getResponse[i].mstate.length;j++)
            { 
               console.log("mstate"+JSON.stringify(getResponse[i].mstate[j].mstate))
              $scope.StateList.push(getResponse[i].mstate[j].mstate);
             }
          }
       }
       console.log("State List data::"+JSON.stringify($scope.StateList));
     }
 self.Statedata=$scope.StateList;
   }


function querySearchState(query) 
 { 

  console.log("datas for query search state::"+JSON.stringify(self.Statedata));
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Statedata.filter( createFilterFor(query) ) : self.Statedata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }

  }

   function searchStateChange(text)
    {
    $scope.State=LocationResponse;
              console.log('Text changed to ' + text);     
    }
  function selectedStateChange(item) {
    if(item ==undefined)
    {    
      console.log("item is undefined");

    }
   else
      {
        self.dis_city = false;
      $scope.selectedStatedata = item; 
        console.log("item is defined");
        $scope.getCitydata($scope.selectedCountrydata,LocationResponse)
        
      }
    }
    //autocomplete functions for state ends here

    //autocomplete functions for city starts here
    $scope.getCitydata=function(Selecteditem,getResponse)
   {
       $scope.CityList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
      console.log(JSON.stringify("The country selected is ::"+Selecteditem))
      if(getResponse[i].mcountry==Selecteditem)
      { 
       
        
         if (getResponse[i].mcity) 
          {  
             console.log("City length::"+JSON.stringify(getResponse[i].mcity.length))
            for(j=0;j<getResponse[i].mcity.length;j++)
            { 
               console.log("mcity"+JSON.stringify(getResponse[i].mcity[j].mcity))
              $scope.CityList.push(getResponse[i].mcity[j].mcity);
             }
          }
       }
       console.log("City List data::"+JSON.stringify($scope.CityList));
     }
 self.Citydata=$scope.CityList;
   }


function querySearchCity(query) 
 { 

  console.log("datas for query search state::"+JSON.stringify(self.Citydata));
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Citydata.filter( createFilterFor(query) ) : self.Citydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }

  }

   function searchCityChange(text)
    {
    $scope.State=LocationResponse;
              console.log('Text changed to ' + text);     
    }
  function selectedCityChange(item) {
    if(item ==undefined)
    {    
      console.log("item is undefined");

    }
   else
      {
        self.dis_building = false;
      $scope.selectedCitydata = item; 
        console.log("item is defined");
        $scope.getBuildingdata($scope.selectedCountrydata,LocationResponse);
        
      }
    }
    //autocomplete functions for city ends here

    //autocomplete functions for building starts here

       $scope.getBuildingdata=function(Selecteditem,getResponse)
   {
       $scope.BuildingList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
      console.log(JSON.stringify("The country selected is ::"+Selecteditem))
      if(getResponse[i].mcountry==Selecteditem)
      { 
       
        
         if (getResponse[i].mbuilding) 
          {  
             console.log("Building length::"+JSON.stringify(getResponse[i].mbuilding.length))
            for(j=0;j<getResponse[i].mbuilding.length;j++)
            { 
               console.log("mbuilding"+JSON.stringify(getResponse[i].mbuilding[j].mbuilding));
              $scope.BuildingList.push(getResponse[i].mbuilding[j].mbuilding);
             }
          }
       }
       console.log("City building data::"+JSON.stringify($scope.BuildingList));
     }
 self.Buildingdata=$scope.BuildingList;
   }


function querySearchBuilding(query) 
 { 

  console.log("datas for query search building::"+JSON.stringify(self.Buildingdata));
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Buildingdata.filter( createFilterFor(query) ) : self.Buildingdata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }

  }

   function searchBuildingChange(text)
    {
    //$scope.State=LocationResponse;
              console.log('Text changed to ' + text);     
    }
  function selectedBuildingChange(item) {
    if(item ==undefined)
    {    
      console.log("item is undefined");

    }
   else
      {
        self.dis_wing = false;
      $scope.selectedBuildingdata = item; 
        console.log("item is defined");
        $scope.getWingdata($scope.selectedCountrydata,LocationResponse);
        
      }
    }
    //autocomplete functions for building ends here

    //autocomplete functions for wing starts here
           $scope.getWingdata=function(Selecteditem,getResponse)
   {
       $scope.WingList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
      console.log(JSON.stringify("The country selected is ::"+Selecteditem))
      if(getResponse[i].mcountry==Selecteditem)
      { 
       
        
         if (getResponse[i].mwing) 
          {  
             console.log("Wing length::"+JSON.stringify(getResponse[i].mwing.length))
            for(j=0;j<getResponse[i].mwing.length;j++)
            { 
               console.log("mwing"+JSON.stringify(getResponse[i].mwing[j].mwing));
              $scope.WingList.push(getResponse[i].mwing[j].mwing);
             }
          }
       }
       console.log("wing data::"+JSON.stringify($scope.WingList));
     }
 self.Wingdata=$scope.WingList;
   }


function querySearchWing(query) 
 { 

  console.log("datas for query search wing::"+JSON.stringify(self.Wingdata));
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Wingdata.filter( createFilterFor(query) ) : self.Wingdata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }

  }

   function searchWingChange(text)
    {
    //$scope.State=LocationResponse;
              console.log('Text changed to ' + text);     
    }
  function selectedWingChange(item) {
    if(item ==undefined)
    {    
      console.log("item is undefined");

    }
   else
      {
      $scope.selectedWingdata = item; 
        console.log("item is defined");
        
      }
    }

    //autocomplete functions for wing stops here



   function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(res) {
          console.log("sj::"+lowercaseQuery);
          return (res.indexOf(query) == 0);
        };

    }
 $scope.getLocation=function()
 {  
   mLocationService.getLocation().then(function(response){
    console.log("The response received for location is"+JSON.stringify(response));
    if(response)
    {
    $scope.mLocation=response.data;
    LocationResponse=response.data;
    $scope.getCountrydata(response.data);
    $scope.contentdata(response.data)
     }  
    }); 
  }

$scope.getLocation();
 $scope.addMasterdata=function(masterType)
  {
       console.log(JSON.stringify(masterType));
  if(masterType == 'Country')
  {
     $location.path('/mCountry');
  }
  else if(masterType == 'State')
  {
        $location.path('/mState');
  }
  else if(masterType == 'City')
  {    
           $location.path('/mCity');
  }
  else if(masterType == 'Building')
  {
           $location.path('/mBuilding');
       
  }
   else if(masterType == 'Floor')
  {
            $location.path('/mFloor');
  }
   else if(masterType == 'Wing')
  {
            $location.path('/mWing');
  }
  }

  /*get all array into data*/
   $scope.contentdata=function(data)
{ 
  console.log("Inside contet data")
  $scope.mResponsedata=data;
  $scope.Statedata=[];
  for(var i=0;i<$scope.mResponsedata.length;i++)
   {     
     if($scope.mResponsedata[i].mstate)
     {   
      for(var j=0;j<$scope.mResponsedata[i].mstate.length;j++)
      { 
       $scope.Statedata.push($scope.mResponsedata[i].mstate[j]);
       
      }
        
      }
    }
}

//country sorting
$scope.vsortCountry=true;
$scope.CountrySortIcon="arrow_drop_down";
$scope.sortCountry=function()
{
  if ($scope.vsortCountry==true) {
    $scope.orderList = "mcountry";
    $scope.vsortCountry=false;
    $scope.CountrySortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-mcountry";
    $scope.vsortCountry=true;
    $scope.CountrySortIcon="arrow_drop_down";
  }
}
//end of country sorting

//deleting country from database
$scope.removeCountry=function(data)
{
  console.log("function remove country was called");
   mLocationService.removeCountry(data).then(function(response)
   {
       console.log(JSON.stringify(response));
       $scope.getLocation();
   });
}
//deleting country from database ends here
});