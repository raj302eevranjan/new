var app=angular.module("app");
var vendortype;
var editableJSon={};
var activestatus;
var cot=0;
var Competency={};
var ltags;
// var tax=0;
var checkcheck={};
var Checktax={};

app.controller("vendorCtrl",function($scope,$location,$localStorage,$filter,$log,$mdDialog, $mdMedia,$q,$timeout,vendorService)
{ 
  $scope.pageSize=['5','10','15','20']
$scope.types=['Equipment Vendor','ILT Vendor','ELearn Vendor','MLearn Vendor','Stationary Vendor','Printing Vendor','f&b Vendor','Travel Vendor'];
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    this.dis_subcompetency=true;
    this.dis_Country=true;
    this.dis_Building=true;
    this.dis_Floor=true;
    this.dis_skills=true;
    // Country
    self.querySearchCountry   = querySearchCountry;
    self.selectedCountryChange = selectedCountryChange;
    self.searchCountryChange   = searchCountryChange;
    // State
    self.querySearchState   = querySearchState;
    self.selectedStateChange = selectedStateChange;
    self.searchStateChange   = searchStateChange;
     // City
    self.querySearchCity   = querySearchCity;
    self.selectedCityChange = selectedCityChange;
    self.searchCityChange   = searchCityChange;
    // Competency
    self.querySearchCompetency   = querySearchCompetency;
    self.selectedCompetencyChange = selectedCompetencyChange;
    self.searchCompetencyChange   = searchCompetencyChange;
    // Sub Competency
    self.querySearchSubCompetency   = querySearchSubCompetency;
    self.selectedSubCompetencyChange = selectedSubCompetencyChange;
    self.searchSubCompetencyChange   = searchSubCompetencyChange;
     // Skills
    self.querySearchSkills   = querySearchSkills;
    self.selectedSkillsChange = selectedSkillsChange;
    self.searchSkillsChange   = searchSkillsChange;
  /*vendor type*/
    self.querySearchType=querySearchType;
    self.searchTypeChange=searchTypeChange;
    self.selectedTypeChange=selectedTypeChange;
    /*vendor Country*/
    self.querySearchvendorCountry=querySearchvendorCountry;
    self.searchvendorCountryChange=searchvendorCountryChange;
    self.selectedvendorCountryChange=selectedvendorCountryChange;
    /*state*/
   self.querySearchvendorState=querySearchvendorState;
    self.searchvendorStateChange=searchvendorStateChange;
    self.selectedvendorStateChange=selectedvendorStateChange;
  /*Country*/
    self.querySearchvendorCity=querySearchvendorCity;
    self.searchvendorCityChange=searchvendorCityChange;
    self.selectedvendorCityChange=selectedvendorCityChange;

    // Certifying_authority
    self.querySearchCertifying_authority   = querySearchCertifying_authority;
    self.selectedCertifying_authorityChange = selectedCertifying_authorityChange;
    self.searchCertifying_authorityChange   = searchCertifying_authorityChange;
    // Certification
    self.querySearchCertification   = querySearchCertification;
    self.selectedCertificationChange = selectedCertificationChange;
    self.searchCertificationChange   = searchCertificationChange;
    this.dis_Certification=true;
    self.readonly = false;
    this.dis_State=true;
    this.dis_City=true;
    var skillarr=[];

      $scope.getVendorType=function(getResponse)
    {
      $scope.vendorTypeList=[];
      
      for(var i= 0;i<getResponse.length;i++)
      {
        if($scope.vendorTypeList.indexOf(getResponse[i].vendortype) == -1)
        {
          $scope.vendorTypeList.push(getResponse[i].vendortype);
        }
      }
      console.log("Vendor List::"+$scope.vendorTypeList);
      self.vendortypedatas=$scope.vendorTypeList;
    }

    function querySearchType (query) 
 {
      console.log("sr::"+query); 
       query=UpperCase(query);
      var results = query ? self.vendortypedatas.filter( createFilterFor(query) ) : self.vendortypedatas,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }
  function searchTypeChange(text) 
  {
      $log.info('Text changed to ' + text);
   }
    function selectedTypeChange(item) 
    {
      $log.info('Type changed to ' + JSON.stringify(item));  
      if(item==undefined)
      {
        $scope.getVendorList=vendorResponse;
        this.dis_Country=true;
        this.dis_State=true;
        this.dis_City=true;
        self.selectedvendorCountry="";
        self.searchvendorCountry="";
        self.vendorCountry="";
        self.selectedvendorState="";
        self.searchvendorState="";
        self.vendorState="";
        self.selectedvendorCity="";
        self.searchvendorCity="";
        self.vendorCity="";
      }
      else{
        this.dis_Country=false;
        
      self.selectedType=item;
      console.log("SelectedType::"+JSON.stringify(self.selectedType))
      $scope.getVendorList = ($filter('filter')($scope.getVendorList, {vendortype: self.selectedType}));
      $scope.vendortypedatas=$scope.getVendorList;
      // alert(JSON.stringify($scope.vendortypedatas));
       console.log("Vendor Data"+JSON.stringify($scope.vendortypedatas))
       $scope.getCountryList(item,vendorResponse);
     }
    }
    $scope.getCountryList=function(data,getResponse)
    {
      $scope.vendorCountryList=[];
      
      for(var i= 0;i<getResponse.length;i++)
      {
        if($scope.vendorCountryList.indexOf(getResponse[i].Country) == -1)
        {
          $scope.vendorCountryList.push(getResponse[i].Country);
        }
      }
      console.log("Vendor List::"+$scope.vendorCountryList);
      self.vendorCountry=$scope.vendorCountryList;
    }
   
 function querySearchvendorCountry (query) 
 {
      console.log("sr::"+query); 
       query=UpperCase(query);
      var results = query ? self.vendorCountry.filter( createFilterFor(query) ) : self.vendorCountry,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }
  function searchvendorCountryChange(text) 
  {
      $log.info('Text changed to ' + text);
   }
    function selectedvendorCountryChange(item) 
    {
      $log.info('Type changed to ' + JSON.stringify(item));  
      if(item==undefined)
      {
        $scope.getVendorList=$scope.vendortypedatas;
         self.selectedvendorState="";
        self.searchvendorState="";
        self.vendorState="";
        self.selectedvendorCity="";
        self.searchvendorCity="";
        self.vendorCity="";
        this.dis_State=true;
       this.dis_City=true;
      }
      else{
              this.dis_State=false;
      
      self.selectedvendorCountry=item;
      console.log("SelectedType::"+JSON.stringify(self.selectedvendorCountry))
      $scope.getVendorList = ($filter('filter')($scope.getVendorList, {Country: self.selectedvendorCountry}));
      $scope.vendortypeData=" ";
      $scope.vendortypeData = $scope.getVendorList;
      // alert(JSON.stringify($scope.getVendorList));
       $scope.getStateList(item,vendorResponse);
     }
    }

    /*state*/
    $scope.getStateList=function(data,getResponse)
    {
      $scope.vendorStateList=[];
      
      for(var i= 0;i<getResponse.length;i++)
      {  if(data==getResponse[i].Country)
        {
        if($scope.vendorStateList.indexOf(getResponse[i].State) == -1)
        {
          $scope.vendorStateList.push(getResponse[i].State);
        }
        };
     }
      console.log("Vendor List::"+$scope.vendorStateList);
      self.vendorState=$scope.vendorStateList;
    }
   
 function querySearchvendorState (query) 
 {  query=UpperCase(query);
      console.log("data::"+query); 
      var results = query ? self.vendorState.filter( createFilterFor(query) ) : self.vendorState,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }
  function searchvendorStateChange(text) 
  {
      $log.info('Text changed to ' + text);
   }
    function selectedvendorStateChange(item) 
    {
      $log.info('Type changed to ' + JSON.stringify(item));  
      if(item==undefined)
      {
        $scope.getVendorList= $scope.vendortypeData;
        self.selectedvendorCity="";
        self.searchvendorCity="";
        self.vendorCity="";
       this.dis_City=true;
      }
      else{
       this.dis_City=false;
      self.selectedvendorState=item;
      console.log("SelectedType::"+JSON.stringify(self.selectedvendorState))
      $scope.getVendorList = ($filter('filter')($scope.getVendorList, {State: self.selectedvendorState}));
      console.log("getVendorList::"+JSON.stringify($scope.getVendorList))
      $scope.vendortypeDatas=" ";
      $scope.vendortypeDatas=$scope.getVendorList;
      // alert(JSON.stringify($scope.getVendorList))
       $scope.getCityList(item,$scope.getVendorList);
     }
    }

    $scope.getCityList=function(data,getResponse)
    { 
      console.log("get state"+JSON.stringify(data))
      $scope.vendorCityList=[];
      
      for(var i= 0;i<getResponse.length;i++)
      {  
        if(data == getResponse[i].State)
      {
           if($scope.vendorCityList.indexOf(getResponse[i].City) == -1)
          {
            $scope.vendorCityList.push(getResponse[i].City);
          }
      };
      }
      console.log("Vendor List::"+$scope.vendorCityList);
      self.vendorCity=$scope.vendorCityList;
    }
   
 function querySearchvendorCity (query) 
 {
      console.log("city::"+query); 
       query=UpperCase(query);
      var results = query ? self.vendorCity.filter( createFilterFor(query) ) : self.vendorCity,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }
  function searchvendorCityChange(text) 
  {
      $log.info('Text changed to ' + text);
   }
    function selectedvendorCityChange(item) 
    {
      $log.info('Type changed to ' + JSON.stringify(item));  
      if(item==undefined)
      {
        
       $scope.getVendorList= $scope.vendortypeDatas;
      }
      else{
      self.selectedvendorCity=item;
      console.log("SelectedType::"+JSON.stringify(self.selectedvendorCity))
      $scope.getVendorList = ($filter('filter')($scope.getVendorList, {City: self.selectedvendorCity}));

       // $scope.getCountryList(item,vendorResponse);
     }
    }
    //SkillSets
    var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;
    self.allTags = loadTags();
    self.Tags = [self.allTags[0]];
    self.asyncSkills = [];
    self.filterSelected = true;
    self.querySearchTags = querySearchTags;
    self.delayedQuerySearchTags = delayedQuerySearchTags;

    function querySearchTags (criteria) {

      cachedQuery = cachedQuery || criteria;

      var k= cachedQuery ? self.allTags.filter(createFilterForTags(cachedQuery)) : [];
      // console.log("k="+JSON.stringify(k));
      // console.log("arr="+JSON.stringify(skillarr));

      var arrUnique = unique(skillarr);
         // console.log("sek:"+JSON.stringify(arrUnique));
         $scope.carrymodel.tags=arrUnique;
        
      return k;
    }
    
    function delayedQuerySearchTags(criteria) {
      cachedQuery = criteria;
      if ( !pendingSearch || !debounceSearch() )  {
        cancelSearch();
        return pendingSearch = $q(function(resolve, reject) {
          cancelSearch = reject;
          $timeout(function() {
            resolve( self.querySearchTags() );
            refreshDebounce();
          }, Math.random() * 500, true)
        });
      }
      return pendingSearch;
    }
    function refreshDebounce() {
      lastSearch = 0;
      pendingSearch = null;
      cancelSearch = angular.noop;
    }
   
    function debounceSearch() {
      var now = new Date().getMilliseconds();
      lastSearch = lastSearch || now;
      return ((now - lastSearch) < 300);
    }
  

var unique = function(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found, x, y;

    for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
            if (origArr[x] === newArr[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            newArr.push(origArr[x]);
        }
    }
    return newArr;
}
function createFilterForTags(query) {

      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(tags) {
         if (angular.isDefined(tags.$$hashKey)) {
          skillarr.push(tags);
         };
         // console.log(JSON.stringify(skillarr));
        return (tags._lowername.indexOf(lowercaseQuery) != -1);
      };
    }
    $scope.getTags=function()
    {
       vendorService.getTags().then(function(response)
       {
          if(response)
          { console.log("response tags"+JSON.stringify(response.data))
           
              $scope.getTagsList(response.data);
          };
       });
    }
  $scope.getTags();
    function loadTags() {
      // $scope.getTags();
       // alert(JSON.stringify($scope.TagsList))
      var ltags = [
        'Tags 1',
        'Tags 2',
        'Tags 3',
        'Tags 4',
        'Tags 5'
      ];
      return ltags.map(function (c, index) {
        var cParts = c.split(' ');
        var tag = {
          name: c
        };
        tag._lowername = tag.name.toLowerCase();
        return tag;
      });
    }
/*bhuvanesh*/

//check for editable mode
console.log("locationnn pathh::" )
if( $location.path() == "/edit_equipement_vendor")
{
  console.log("inside edit vendor")
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    self.selectedCountry=$scope.carrymodel.Country;
    self.selectedState=$scope.carrymodel.State;
    self.selectedCity=$scope.carrymodel.City;
       // var dateStr=JSON.parse(JSON.stringify($scope.carrymodel.Empanelment_Date));
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}

else if($location.path()=="/edit_ilt_vendor")
{ 
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    self.selectedCountry=$scope.carrymodel.Country;
    self.selectedState=$scope.carrymodel.State;
    self.selectedCity=$scope.carrymodel.City;
    
    
    // var dateStr=JSON.parse(JSON.stringify($scope.carrymodel.Empanelment_Date));
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}
else if($location.path()=="/edit_elearn_vendor")
{ 
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    self.selectedCountry=$scope.carrymodel.Country;
    self.selectedState=$scope.carrymodel.State;
    self.selectedCity=$scope.carrymodel.City;
    
    
    // var dateStr=JSON.parse(JSON.stringify($scope.carrymodel.Empanelment_Date));
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}
else if($location.path()=="/edit_mlearn_vendor")
{ 
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    self.selectedCountry=$scope.carrymodel.Country;
    self.selectedState=$scope.carrymodel.State;
    self.selectedCity=$scope.carrymodel.City;
    
    
    // var dateStr=JSON.parse(JSON.stringify($scope.carrymodel.Empanelment_Date));
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}
else if($location.path()=="/edit_stationary_vendor")
{ 
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    self.selectedCountry=$scope.carrymodel.Country;
    self.selectedState=$scope.carrymodel.State;
    self.selectedCity=$scope.carrymodel.City;
    
    
    // var dateStr=JSON.parse(JSON.stringify($scope.carrymodel.Empanelment_Date));
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}
/// Printing vendor
else if($location.path()=="/edit_printing_vendor")
{ 
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    self.selectedCountry=$scope.carrymodel.Country;
    self.selectedState=$scope.carrymodel.State;
    self.selectedCity=$scope.carrymodel.City;
    
    
    // var dateStr=JSON.parse(JSON.stringify($scope.carrymodel.Empanelment_Date));
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}
//// End of printing vendor
else if($location.path()=="/edit_f&b_vendor")
{ 
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    self.selectedCountry=$scope.carrymodel.Country;
    self.selectedState=$scope.carrymodel.State;
    self.selectedCity=$scope.carrymodel.City;
    
    
    // var dateStr=JSON.parse(JSON.stringify($scope.carrymodel.Empanelment_Date));
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}
else if($location.path()=="/edit_Travel_vendor")
{ 
  if (angular.isDefined(editableJSon))
   {
    $scope.carrymodel=editableJSon;
    self.selectedCountry=$scope.carrymodel.Country;
    self.selectedState=$scope.carrymodel.State;
    self.selectedCity=$scope.carrymodel.City;
    
    
    // var dateStr=JSON.parse(JSON.stringify($scope.carrymodel.Empanelment_Date));
    var dd=new Date($scope.carrymodel.Empanelment_Date);
    console.log("Empanelment_Date carrymodel::"+dd);
    $scope.Empanelment_Date= dd;
    console.log("Empanelment_Date::"+JSON.stringify($scope.Empanelment_Date));
   }
}
//allow edit action while it is in editablemode
console.log("LocalStorage::"+$localStorage.editonlypass);
console.log("location path::"+$location.path());
  if($localStorage.editonlypass==$location.path())
  {
    console.log("External localStorage");
        $location.path($localStorage.editonlypass);
   } 
   else if($location.path()=="/add_equipmentVendor")
   {
        $localStorage.editonlypass="";
        console.log("Vendor TYPE CHECK::"+vendortype);
        if (vendortype) {
             console.log("Vendor TYPE::"+vendortype)
        }else{
        $location.path("/vendor");
        }
   }
  else if($location.path()=="/add_ilt_vendor")
  {
       $localStorage.editonlypass="";
        console.log("Vendor TYPE CHECK::"+vendortype);
        if (vendortype) {
             console.log("Vendor TYPE::"+vendortype)
        }else{
        $location.path("/vendor");
        }

  }
  else if($location.path()=="/add_elearn_vendor")
  {
       $localStorage.editonlypass="";
        console.log("Vendor TYPE CHECK::"+vendortype);
        if (vendortype) {
             console.log("Vendor TYPE::"+vendortype)
        }else{
        $location.path("/vendor");
        }

  }
  else if($location.path()=="/add_mlearn_vendor")
  {
       $localStorage.editonlypass="";
        console.log("Vendor TYPE CHECK::"+vendortype);
        if (vendortype) {
             console.log("Vendor TYPE::"+vendortype)
        }else{
        $location.path("/vendor");
        }

  }
   else if($location.path()=="/add_stationary_vendor")
  {
       $localStorage.editonlypass="";
        console.log("Vendor TYPE CHECK::"+vendortype);
        if (vendortype) {
             console.log("Vendor TYPE::"+vendortype)
        }else{
        $location.path("/vendor");
        }

  }
  else if($location.path()=="/add_printing_vendor")
  {
       $localStorage.editonlypass="";
        console.log("Vendor TYPE CHECK::"+vendortype);
        if (vendortype) {
             console.log("Vendor TYPE::"+vendortype)
        }else{
        $location.path("/vendor");
        }

  }
   else if($location.path()=="/add_f&b_vendor")
  {
       $localStorage.editonlypass="";
        console.log("Vendor TYPE CHECK::"+vendortype);
        if (vendortype) {
             console.log("Vendor TYPE::"+vendortype)
        }else{
        $location.path("/vendor");
        }

  }
   else if($location.path()=="/add_Travel_vendor")
  {
       $localStorage.editonlypass="";
        console.log("Vendor TYPE CHECK::"+vendortype);
        if (vendortype) {
             console.log("Vendor TYPE::"+vendortype)
        }else{
        $location.path("/vendor");
        }
   }
  else if($location.path() == "/vendormanagement")
  {
     // $localStorage.editonlypass="";
     $localStorage.editonlypass="";
      cot=1;

  }
  else
  {
     $location.path("/vendor");
  }

// date
      $scope.date=function()
   {
    var date=GetFormattedDate($scope.Empanelment_Date);
     console.log("date::"+JSON.stringify(date))
     $scope.carrymodel.Empanelment_Date=date;
   }
  function GetFormattedDate(dd) 
  {
    var todayTime = new Date(dd);
    
    var day = ("0" + todayTime .getDate()).slice(-2);
    var month = ("0" + (todayTime .getMonth()+1)).slice(-2);
    var year = todayTime .getFullYear();
    return month + "/" + day+ "/" + year;
  }
  // check initialize
    if (cot==0) 
    {
      // $scope.nexts=false;
      $scope.carrymodel.Projector=false;
      $scope.carrymodel.Projector_Screen=false;
      $scope.carrymodel.Audio_Equipments=false;
      $scope.carrymodel.Printing_Photo_Copy_Machine=false;
      $scope.carrymodel.Flip_Board=false;
      checkcheck=$scope.carrymodel;
      console.log("trainer controller triggered"+JSON.stringify(checkcheck));
      cot=1;
    };
  //Active status
  $scope.changeActiveStatus=function()
  {
    $scope.carrymodel.activestatus=!$scope.carrymodel.activestatus;
    $scope.getVendor();
  }

  // get Vendor
  $scope.getVendor=function()
   {
      console.log("get Vendor");
     if (!angular.isDefined(activestatus) || !$scope.activestatus)
      {
        console.log("undefined");
        activestatus=false;
      }
      else
      {
       activestatus=$scope.activestatus;
      }
       console.log("activestatus"+activestatus);
       vendorService.getVendor(activestatus).then(function(response) 
       {
         $scope.getVendorList=response.data;
         vendorResponse=response.data;
         $scope.getVendorType(response.data);
         console.log("Get Vendor List::"+JSON.stringify($scope.getVendorList));
       });
   }

 //chagetype 
   $scope.changeType=function()
   {
      
      $localStorage.vendortype=$scope.carrymodel.vendortype;
      console.log("local vendortype::"+$localStorage.vendortype)
       vendortype=$scope.carrymodel.vendortype;
       console.log("vendorType::"+JSON.stringify(vendortype));
    }
// add vendor
  $scope.addVendor=function()
  {  
    console.log("Add Vendor");
    console.log("localStorage::"+$localStorage.currentPath)
    $localStorage.currentPath=$location.path();
    console.log("location path::"+$location.path());
   if($scope.carrymodel.vendortype=="Equipment Vendor"){
    console.log("vendortype::"+$scope.carrymodel.vendortype)
    $location.path("/add_equipmentVendor");
    }else if($scope.carrymodel.vendortype=="F&B Vendor"){
    $location.path("/FB_Vendor");
    }else if($scope.carrymodel.vendortype=="ILT Vendor"){
      console.log("vendortype::"+$scope.carrymodel.vendortype)
     $location.path("/add_ilt_vendor");
   }else if($scope.carrymodel.vendortype=="ELearn Vendor"){
      console.log("vendortype::"+$scope.carrymodel.vendortype)
     $location.path("/add_elearn_vendor");
   }else if($scope.carrymodel.vendortype=="MLearn Vendor"){
      console.log("vendortype::"+$scope.carrymodel.vendortype)
     $location.path("/add_mlearn_vendor");
   }
   else if($scope.carrymodel.vendortype=="Stationary Vendor"){
      console.log("vendortype::"+$scope.carrymodel.vendortype)
     $location.path("/add_stationary_vendor");
   }
   else if($scope.carrymodel.vendortype=="Printing Vendor"){
      console.log("vendortype::"+$scope.carrymodel.vendortype)
     $location.path("/add_printing_vendor");
   }
   else if($scope.carrymodel.vendortype=="f&b Vendor"){
      console.log("vendortype::"+$scope.carrymodel.vendortype)
     $location.path("/add_f&b_vendor");
   }
   else if($scope.carrymodel.vendortype=="Travel Vendor"){
      console.log("vendortype::"+$scope.carrymodel.vendortype)
     $location.path("/add_Travel_vendor");
   }
 }


 $scope.getLocation=function(){
  
  vendorService.getCSCLocation().then(function(response){
    // console.log("Get CSCLocation Data::"+JSON.stringify(response));
    if (response) {
      // $scope.CSCLocationSelect=['s','t','g'];
      console.log("Res::"+JSON.stringify(response.data));
      LocationResponse=response.data;
      $scope.getCountry(response.data);
      console.log("LocationResponse::"+JSON.stringify(LocationResponse));
      
    };

  })
  
}
$scope.getLocation();
$scope.getCountry=function(getResponse){
  $scope.CountryList=[];
  for (var i = 0;i<getResponse.length;i++) {
    if ($scope.CountryList.indexOf(getResponse[i].Country) == -1) {
    $scope.CountryList.push(getResponse[i].Country);
    }
  };
  console.log("Country List::"+$scope.CountryList);
  console.log("selectedItem");
  self.countries=$scope.CountryList;

}

$scope.getState=function(SelectedCountry,getResponse){
  
  
  console.log("Statte get::"+JSON.stringify(getResponse));
  console.log("state Country get::"+SelectedCountry);
  $scope.StateList=[];
  for (var i = 0;i<getResponse.length;i++) {
    console.log(SelectedCountry+"="+getResponse[i].Country);
    if (SelectedCountry==getResponse[i].Country) {
      if ($scope.StateList.indexOf(getResponse[i].State) == -1) {
        $scope.StateList.push(getResponse[i].State);
        }
    };
    
  };
  self.states=$scope.StateList;
  console.log("State List::"+self.states);
}
$scope.getCity=function(SelectedState,getResponse){
  $scope.CityList=[];
  for (var i = 0;i<getResponse.length;i++) {
    if (SelectedState==getResponse[i].State) {
      console.log(SelectedState+"="+getResponse[i].State);
      self.selectedState=$scope.carrymodel.State;
    
      if ($scope.CityList.indexOf(getResponse[i].City) == -1) {
        $scope.CityList.push(getResponse[i].City);
        }
    };
  };
  self.Cities=$scope.CityList;
  console.log("City List::"+$scope.CityList);
}



  function querySearchCountry (query) 
 {
      console.log("sr::"+query); 
      query=UpperCase(query);
      var results = query ? self.countries.filter( createFilterFor(query) ) : self.countries,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }
    function querySearchState (query) {
    console.log("state::"+JSON.stringify(self.states)); 
     query=UpperCase(query);
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function querySearchCity (query) {
    console.log("state::"+query);
       query=UpperCase(query);
      var results = query ? self.Cities.filter( createFilterFor(query) ) : self.Cities,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchCountryChange(text) {
       
      $log.info('Text changed to ' + text);
      
    }
    function selectedCountryChange(item) {
      if(item== undefined){
        this.dis_City=true;
       this.dis_State=true;

      self.selectedState="";
      self.searchState="";
      self.selectedCity="";
        self.searchCity="";
      }
    else{
       // this.dis_City=false;
       this.dis_State=false;
      $log.info('Country changed to ' + JSON.stringify(item));
      $scope.carrymodel.Country=item;
      self.selectedCountry=$scope.carrymodel.Country;
    
  console.log("SelectedCountry::"+JSON.stringify($scope.carrymodel.Country))
       $scope.getState(item,LocationResponse);
     }
    }
    
    function searchStateChange(text) {
      $log.info('Text changed to ' + text);

    }
    function selectedStateChange(item) {
      console.log("changed states")
      if(item == undefined)
      {
        this.dis_City=true;
        self.selectedCity="";
        self.searchCity="";
      }
      else
      { 
        this.dis_City=false;
      $log.info('State changed to ' + JSON.stringify(item));
            $scope.carrymodel.State=item;
  console.log("SelectedState::"+JSON.stringify($scope.carrymodel.State))
      $scope.getCity(item,LocationResponse);

    }
  }
    function searchCityChange(text) {
      $log.info('Text changed to ' + text);
      
    }
    function selectedCityChange(item) {
      if(item == undefined)
      {   
          this.dis_Building=true;
          this.dis_Floor=true;
           self.selectedBuilding="";
        self.searchBuilding="";
        self.selectedFloor="";
        self.searchFloor="";
      }
      else{
        this.dis_Building=false;
          this.dis_Floor=false;
            $scope.carrymodel.City=item;
            self.selectedCity=$scope.carrymodel.City;
  console.log("selectedCity::"+JSON.stringify($scope.carrymodel.City))
      $log.info('City changed to ' + JSON.stringify(item));
   }
       }

      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(res) {
          console.log("sj::"+lowercaseQuery);
          return (res.indexOf(query) == 0);
        };

    }
     /*bhuvanesh*/
   // edit vendor
   $scope.editVendor=function(item)
  { 
     console.log("edit Vendor"+JSON.stringify(item));
     editableJSon=item;
     console.log("ediitpass"+ $localStorage.editonlypass)
     console.log("local PAth"+$location.path());
     if($location.path()=="/vendormanagement")
     {
        $localStorage.currentPath= "/vendor";
     }
     else
     {
      $localStorage.currentPath=$location.path();
     }
     
     if(editableJSon.vendortype=="ILT Vendor")
     { 
      $localStorage.vendortype="ILT Vendor";
      console.log("edit ilt vendor"+JSON.stringify(editableJSon));
      $scope.carrymodel=editableJSon;
      $localStorage.editonlypass="/edit_ilt_vendor";
       $location.path("/edit_ilt_vendor");
        
     }else if(editableJSon.vendortype=="F&B Vendor")
     {  
       $location.path("/FB_Vendor");
      }
    else if(editableJSon.vendortype=="Equipment Vendor")
     {  
     $localStorage.vendortype="Equipment Vendor";
      $scope.carrymodel=editableJSon;
      // $scope.nexts=false;
      console.log("edit Equipment vendor::"+JSON.stringify(editableJSon));
      $localStorage.editonlypass="/edit_equipement_vendor";
      $location.path("/edit_equipement_vendor");   
      }
      else if(editableJSon.vendortype=="ELearn Vendor")
     {  
     $localStorage.vendortype="ELearn Vendor";
      $scope.carrymodel=editableJSon;
      // $scope.nexts=false;
      console.log("edit E learn vendor::"+JSON.stringify(editableJSon));
      $localStorage.editonlypass="/edit_elearn_vendor";
      $location.path("/edit_elearn_vendor");   
      }
      else if(editableJSon.vendortype=="MLearn Vendor")
     {  
     $localStorage.vendortype="MLearn Vendor";
      $scope.carrymodel=editableJSon;
      // $scope.nexts=false;
      console.log("edit M learn vendor::"+JSON.stringify(editableJSon));
      $localStorage.editonlypass="/edit_mlearn_vendor";
      $location.path("/edit_mlearn_vendor");   
      }
      else if(editableJSon.vendortype=="Stationary Vendor")
     {  
     $localStorage.vendortype="Stationary Vendor";
      $scope.carrymodel=editableJSon;
      // $scope.nexts=false;
      console.log("edit Stationary vendor::"+JSON.stringify(editableJSon));
      $localStorage.editonlypass="/edit_stationary_vendor";
      $location.path("/edit_stationary_vendor");   
      }
      //Edit printing Vendor
      else if(editableJSon.vendortype=="Printing Vendor")
     {  
     $localStorage.vendortype="Printing Vendor";
      $scope.carrymodel=editableJSon;
      // $scope.nexts=false;
      console.log("edit printing vendor::"+JSON.stringify(editableJSon));
      $localStorage.editonlypass="/edit_printing_vendor";
      $location.path("/edit_printing_vendor");   
      }
      // end of printing vendor
      else if(editableJSon.vendortype=="f&b Vendor")
     {  
     $localStorage.vendortype="f&b Vendor";
      $scope.carrymodel=editableJSon;
      // $scope.nexts=false;
      console.log("edit f&b vendor::"+JSON.stringify(editableJSon));
      $localStorage.editonlypass="/edit_f&b_vendor";
      $location.path("/edit_f&b_vendor");   
      }
      else if(editableJSon.vendortype=="Travel Vendor")
     {  
     $localStorage.vendortype="Travel Vendor";
      $scope.carrymodel=editableJSon;
      // $scope.nexts=false;
      console.log("edit Travelendor::"+JSON.stringify(editableJSon));
      $localStorage.editonlypass="/edit_Travel_vendor";
      $location.path("/edit_Travel_vendor");   
      }


  }
  // remove vendor
  $scope.removeVendor=function(id)
  {
    console.log("Remove Vendor"+id);
    vendorService.removeVendor(id).then(function(response)
    {
      console.log("removeVendor"+JSON.stringify(response.data))
    })
    $scope.getVendor();
  }
 // submit
   $scope.submitaction=function(savedata)
   {
    console.log("submitaction"+JSON.stringify(savedata));
    console.log("location path"+$location.path());
    if($location.path()=="/add_ilt_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendor");
            };
        })
    }
    
    else if ($location.path()=="/add_equipmentVendor") 
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendor");
            };
        })
    }
    else if($location.path()=="/add_elearn_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendor");
            };
        })
    }
     else if($location.path()=="/add_mlearn_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendor");
            };
        })
    }
    else if($location.path()=="/add_stationary_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendor");
            };
        })
    }
    else if($location.path()=="/add_printing_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendor");
            };
        })
    }
    else if($location.path()=="/edit_ilt_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendor");
           };
       })
     }
     else if($location.path()=="/edit_equipement_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendor($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendor");
           };
       })
     }
    else if($location.path()=="/edit_elearn_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendor");
           };
       })
     }
      else if($location.path()=="/edit_mlearn_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendor");
           };
       })
     }
     else if($location.path()=="/edit_mlearn_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendor");
           };
       })
     }
 else if($location.path()=="/edit_stationary_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendor");
           };
       })
     }

      else if($location.path()=="/edit_printing_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.updateVendordata(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendor");
            };
        })
    }
    else if($location.path()=="/add_f&b_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendor");
            };
        })
    }
    else if($location.path()=="/add_Travel_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendor");
            };
        })
    }
    else if($location.path()=="/edit_f&b_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendor");
           };
       })
     }
     else if($location.path()=="/edit_Travel_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendor");
           };
       })
     }

   }
     


 $scope.getTagsList=function(getResponse)
 {
  $scope.TagsList=[];
  for(var i=0;i<getResponse.length;i++)
  {
    if($scope.TagsList.indexOf(getResponse[i].Tags) == -1)
    {
      $scope.TagsList.push(getResponse[i].Tags);
    }
  } 
  /*Bhuvanesh*/
  // alert(JSON.stringify($scope.TagsList)); 
  ltags=$scope.TagsList;
  // alert(JSON.stringify(ltags))
  /*Bhuvanesh*/
 }
   
     

   // active vendor
  $scope.activeVendor=function(item)
  {
    var activeItem=item;
    vendorService.activeVendor(activeItem).then(function(response) {
    $scope.getVendor();
    }); 
  }

$scope.changeProjector=function(){
    checkcheck.Projector=$scope.carrymodel.Projector;
  $scope.checkboxs();
}
$scope.changeProjector_Screen=function(){
  checkcheck.Projector_Screen=$scope.carrymodel.Projector_Screen;
  $scope.checkboxs();
}
$scope.changeAudio_Equipments=function(){
   checkcheck.Audio_Equipments=$scope.carrymodel.Audio_Equipments;
  $scope.checkboxs();
}
$scope.changePrinting_Photo_Copy_Machine=function(){
    checkcheck.Printing_Photo_Copy_Machine=$scope.carrymodel.Printing_Photo_Copy_Machine;
    $scope.checkboxs();
}
$scope.changechangeFlip_Board=function(){
   checkcheck.changeFlip_Board=$scope.carrymodel.changeFlip_Board;
  $scope.checkboxs();
}

  // check box 
  $scope.checkboxs=function()
  { 
    console.log(JSON.stringify(checkcheck));
    var arrcheck=[];
    var getArrCheck=[];
    var kjson=checkcheck;
    for(var keyName in kjson)
    {        
     var key=keyName ;
     var value= kjson[keyName];
     arrcheck.push(value);
    }
      for(var i=0;i<arrcheck.length;i++)
    {
       console.log(arrcheck[i]);
      if (arrcheck[i] == true) 
       {
         getArrCheck.push(arrcheck[i]);
       }
    }
   console.log("Length::"+getArrCheck.length);
    if (getArrCheck.length>=1) 
    {
        console.log("Now enable the button");
        $scope.nexts=false;
    }else
    {
        console.log("Disable the button now!");
        $scope.nexts=true;
    } 
}
 // tax inforrmation

$scope.pancardCheck=function()
{
   Checktax.Pan_Card=$scope.carrymodel.Pan_Card;
   $scope.taxs();
}
$scope.tinnumberCheck=function()
{
  Checktax.TIN_Number=$scope.carrymodel.TIN_Number;
  $scope.taxs();
}
$scope.tannumberCheck=function()
{
  Checktax.TAN_Number=$scope.carrymodel.TAN_Number;
  $scope.taxs();
}
$scope.servicetaxnumberCheck=function()
{
  Checktax.Service_Tax_Number=$scope.carrymodel.Service_Tax_Number;
  $scope.taxs();
}

$scope.taxs=function()
  { 
    console.log(JSON.stringify(Checktax));
    var arrcheck=[];
    var getArrCheck=[];
    var kjson=Checktax;
    for(var keyName in kjson)
    {        
     var key=keyName ;
     var value= kjson[keyName];
     arrcheck.push(value);
    }
      for(var i=0;i<arrcheck.length;i++)
    {  console.log("arrcheck"+arrcheck.length)
       console.log(arrcheck[i]);
      if (arrcheck[i] !== " " || arrcheck[i] == "undefined" ) 
       {
         getArrCheck.push(arrcheck[i]);
       }
    }
   console.log("Length::"+getArrCheck.length);
    if (getArrCheck.length>=2) 
    {
        console.log("Now enable the button");
        $scope.nextTax=false;
    }else
    {
        console.log("Disable the button now!");
        $scope.nextTax=true;
    } 
}
//SORT
$scope.vsortvendor=true;
$scope.vendorSortIcon="arrow_drop_down";
$scope.sortvendor=function(){
  if ($scope.vsortvendor==true) {
    $scope.orderList = "Vendor_Company";
    $scope.vsortvendor=false;
    $scope.vendorSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-Vendor_Company";
    $scope.vsortvendor=true;
    $scope.vendorSortIcon="arrow_drop_down";
  }
}

$scope.vsortType=true;
$scope.typeSortIcon="arrow_drop_down";
$scope.sorttype=function(){

  if ($scope.vsortType==true) {
    $scope.orderList = "vendortype";
    $scope.vsortType=false;
    $scope.typeSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-vendortype";
    $scope.vsortType=true;
    $scope.typeSortIcon="arrow_drop_down";
  }
}
$scope.vsortLocation=true;
$scope.locationSortIcon="arrow_drop_down";
$scope.sortlocation=function(){

  if ($scope.vsortLocation==true) {
    $scope.orderList = "City";
    $scope.vsortLocation=false;
    $scope.locationSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-City";
    $scope.vsortLocation=true;
    $scope.locationSortIcon="arrow_drop_down";
  }
}
 

/*2*/

 /*ILT Vendor*/
 $scope.getCompetency=function()
 {  
   vendorService.getCompetency().then(function(response) {
   $scope.Competency=response.data;
    competencyResponse=response.data;
   $scope.getCompetencydata(response.data);
    console.log("competencyResponse::"+JSON.stringify(competencyResponse));
    }); 
  }
  $scope.getCompetency();
  
   /*bhuvanesh*/
   $scope.getCompetencydata=function(getResponse)
   {
      $scope.CompetencyList=[];
       for (var i = 0;i<getResponse.length;i++)
     {
       if ($scope.CompetencyList.indexOf(getResponse[i].competency) == -1) 
        {
          // console.log("CompetencyList"+JSON.stringify($scope.CompetencyList.push(getResponse[i].competency)))
         $scope.CompetencyList.push(getResponse[i].competency);
        }
     }
       console.log("Competency List::"+$scope.CompetencyList);
      self.competencydata=$scope.CompetencyList;
   }

   function querySearchCompetency (query) 
 {     
  

  console.log("datas::"+JSON.stringify(self.competencydata));
      console.log("sr::"+query); 
       query=UpperCase(query);
      var results = query ? self.competencydata.filter( createFilterFor(query) ) : self.competencydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchCompetencyChange(text)
    {    $scope.Competency=competencyResponse;
              $log.info('Text changed to ' + text);
              // this.searchSubCompetency="";
      
    }
  function selectedCompetencyChange(item) {
    console.log("Item"+JSON.stringify(item));
    if(item ==undefined)
    {    
          $scope.Competency=competencyResponse;
         // self.subcompetency="";
         
         self.searchSubCompetency="";
         self.searchSkills="";
         this.dis_subcompetency=true;
         this.dis_skills=true;
    }
      else{
        this.dis_subcompetency=false;
      self.selectedCompetency=item;
       $scope.Competency=($filter('filter')($scope.Competency, {competency: item}));
       $scope.Competencyfliter=$scope.Competency;
       console.log(JSON.stringify($scope.Competency))
       $scope.getSubCompetencydata(item,competencyResponse);
       console.log()
     }
    }


    $scope.getSubCompetencydata=function(selectedCompetency,getResponse)
    {    $scope.Competency=$scope.Competencyfliter;
      console.log("selectedCompetency::"+JSON.stringify(selectedCompetency))
    console.log("competencyResponse"+JSON.stringify(getResponse))
      // console.log("subcompetency competency get::"+selectedCompetency);
      /*bhuvanesh*/
      
      $scope.SubCompetencyList=[];
      for (var i = 0;i<getResponse.length;i++) {
        // console.log(selectedCompetency+"="+getResponse[i].competency);
        if (selectedCompetency==getResponse[i].competency) {
          if ($scope.SubCompetencyList.indexOf(getResponse[i].sub_competency) == -1) {
            $scope.SubCompetencyList.push(getResponse[i].sub_competency);
            }
        };
        
      };
      self.subcompetency=$scope.SubCompetencyList;
      
      console.log("SubCompetency List::"+self.subcompetency);
  }
   
   function querySearchSubCompetency (query) {
    console.log("SubCompetency::"+query); 
     query=UpperCase(query);
      var results = query ? self.subcompetency.filter( createFilterFor(query) ) : self.subcompetency,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchSubCompetencyChange(text) {
      $log.info('Text changed to ' + text);
      
    }
    function selectedSubCompetencyChange(item) {
    if(item == undefined)
    {  
      $scope.Competency=$scope.Competencyfliter;
       this.searchSkills=""; 
       this.dis_skills=true;    
    } 
   else{
       this.dis_skills=false;
       self.selectedSubCompetency=item;
      console.log("Sub competencyResponse"+JSON.stringify(self.selectedSubCompetency))
      $scope.Competency= ($filter('filter')($scope.Competencyfliter,{sub_competency:self.selectedSubCompetency})); 
        $scope.SubCompetencyfilter=$scope.Competency;
      $scope.getSkills(self.selectedSubCompetency,competencyResponse);
     }
    }
    $scope.getSkills=function(selectedSubCompetency,getResponse)
    { $scope.Competency=$scope.SubCompetencyfilter;
        $log.info('slected subcompetency ' + JSON.stringify(selectedSubCompetency));
        console.log("Response data"+JSON.stringify(getResponse))
      $scope.SkillListdata=[];
      for (var i = 0;i<getResponse.length;i++) {
        
        if (selectedSubCompetency==getResponse[i].sub_competency) {
          console.log("selectedSubCompetency skills"+getResponse[i].skills);        
          if ($scope.SkillListdata.indexOf(getResponse[i].skills) == -1) {
            $scope.SkillListdata.push(getResponse[i].skills);
               console.log("skills::"+JSON.stringify($scope.SkillListdata));
            }
        };
      };
      self.SkillSet=$scope.SkillListdata;
      
   }

   function querySearchSkills (query) {
      query=UpperCase(query);
    console.log("SubCompetency::"+query); 
      var results = query ? self.SkillSet.filter( createFilterFor(query) ) : self.SkillSet,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchSkillsChange(text) {
      $log.info('Text changed to ' + text);
      if (text=="") {
        $scope.Competency=$scope.SubCompetencyfilter;
        
       };
    }
    function selectedSkillsChange(item) {
            // $scope.carrymodel.City=item;
            self.selectedSkills=item;
            $scope.Competency=($filter('filter')($scope.SubCompetencyfilter,{skills:item}))
            $scope.skillsfilter=$scope.Competency;
  // console.log("selectedCity::"+JSON.stringify($scope.carrymodel.City))
      $log.info('Skills changed to ' + JSON.stringify(item));
      // $scope.getBuilding(item,LocationResponse);
    }
  $scope.selectCompetency=[];
 $scope.showAdvanced = function(ev) {

  $scope.carrymodel.addcomp=true;
  console.log(JSON.stringify($scope.Competency));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller :VendorController,
      templateUrl: 'angular/view/dialog_iltcompetency_vendor.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals: {
        items: $scope.Competency
     }
    })
    .then(function(answer) {
      console.log("ok"+JSON.stringify(answer));
      $scope.carrymodel.selectCompetency_data=answer;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
$scope.Competency_checkOne=function(vindex){
console.log(JSON.stringify($scope.Competency));
}
$scope.Competency_checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;

        } else {
            $scope.selectedAll = false;
        }
        
        angular.forEach($scope.Competency, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log("$scope.Competency::"+JSON.stringify($scope.Competency));
    };
    $scope.Competency_saveAction=function(){
      console.log(JSON.stringify($scope.Competency));
      for(var i=0;i<$scope.Competency.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.Competency[i].Selected));
        if ($scope.Competency[i].Selected==false || !angular.isDefined($scope.Competency[i].Selected)) {}else{
        $scope.selectCompetency.push($scope.Competency[i]);
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.selectCompetency));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.selectCompetency);
    }
    $scope.removeCompetency=function(vindex){
      $scope.carrymodel.selectCompetency_data.splice(vindex,1);
    }


 // skill buttton
  $scope.add_skills=function()
  {
    $scope.addskill=true;
  }  


  // certification
  
  
  $scope.selectCertification=[];
 $scope.showAdvanced1 = function(ev) {
  $scope.carrymodel.addcert=true;
  console.log(JSON.stringify($scope.Certification));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller :VendorController,
      templateUrl: 'angular/view/dialog_iltcertification_vendor.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      console.log("ok"+JSON.stringify(answer));
      $scope.carrymodel.selectCertification_data=answer;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
$scope.checkOne=function(vindex){
console.log(JSON.stringify($scope.Certification));
}
$scope.checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;

        } else {
            $scope.selectedAll = false;
        }
        
        angular.forEach($scope.Certification, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log("$scope.Certification::"+JSON.stringify($scope.Certification));
    };
    $scope.saveAction=function(){
      console.log(JSON.stringify($scope.Certification));
      for(var i=0;i<$scope.Certification.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.Certification[i].Selected));
        if ($scope.Certification[i].Selected==false || !angular.isDefined($scope.Certification[i].Selected)) {}else{
        $scope.selectCertification.push($scope.Certification[i]);
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.selectCertification));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.selectCertification);
    }
    $scope.removeCertification=function(vindex){
      $scope.carrymodel.selectCertification_data.splice(vindex,1);
    }
    /*goto vendor mangement*/
   $scope.gotoVendormanagement=function()
   {
    $location.path('/vendor')
   }
    /*uppercase first letter*/
    function UpperCase(string) 
    {  
          if(string == null)
          {

          }
          else
          {
          return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); 
          }
    } 
    
    function VendorController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  } 


 $scope.getCertification=function()
  {
    vendorService.getCertification().then(function(response){
      $scope.Certification=response.data;
      CertificateResponse=response.data;
     $scope.getCertifying_authoritydata(response.data)
    });
  }
  $scope.getCertification();
   /*Certifying Authority*/
   $scope.getCertifying_authoritydata=function(getResponse)
   {  console.log("getResponse"+JSON.stringify(getResponse));
      $scope.Certifying_authorityList=[];
       for (var i = 0;i<getResponse.length;i++)
     {
       if ($scope.Certifying_authorityList.indexOf(getResponse[i].Certifying_Authority) == -1) 
        {
         $scope.Certifying_authorityList.push(getResponse[i].Certifying_Authority);
        }
     }
       console.log("Certifying_authority List::"+$scope.Certifying_authorityList);
      self.Certifying_authoritydata=$scope.Certifying_authorityList;
   }

   function querySearchCertifying_authority (query) 
 {     
    console.log("datas::"+JSON.stringify(self.Certifying_authoritydata));
      console.log("sr::"+query); 
       query=UpperCase(query);
      var results = query ? self.Certifying_authoritydata.filter( createFilterFor(query) ) : self.Certifying_authoritydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchCertifying_authorityChange(text)
    {   
      $scope.Certification=CertificateResponse;
      $log.info('Text changed to ' + text);
    }
  function selectedCertifying_authorityChange(item) {
    console.log("Item"+JSON.stringify(item));
    if(item ==undefined)
    {      this.searchCertification="";
          this.dis_Certification=true;
          $scope.Certification=CertificateResponse;
         
         
    }
      else{
        this.dis_Certification=false;
      self.selectedCertifying_authority=item;
       $scope.Certification=($filter('filter')($scope.Certification, {Certifying_Authority: item}));
       $scope.Certifying_authorityfliter=$scope.Certification;
       $scope.getCertificationdata(self.selectedCertifying_authority,CertificateResponse);

       console.log()
     }
    }

  


  /*certification*/
  $scope.getCertificationdata=function(selectedCertifying_authority,getResponse)
    {         
      $scope.CertificationList=[];
      for (var i = 0;i<getResponse.length;i++) 
      {
        if (selectedCertifying_authority==getResponse[i].Certifying_Authority)
         {
          if ($scope.CertificationList.indexOf(getResponse[i].Certification) == -1)
           {
             $scope.CertificationList.push(getResponse[i].Certification);
          }
        };  
      };
      self.Certificationdata=$scope.CertificationList;
      console.log("Certification List::"+self.Certification);
  }
   
   function querySearchCertification (query) {
    console.log("Certification::"+query); 
     query=UpperCase(query);
      var results = query ? self.Certificationdata.filter( createFilterFor(query) ) : self.Certificationdata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchCertificationChange(text) {
      $log.info('Text changed to ' + text);
      
    }
    function selectedCertificationChange(item) {
    if(item == undefined)
    {   
      $scope.Certification=$scope.Certifying_authorityfliter;
    } 
   else{
       self.selectedCertification=item;
      console.log("Certification"+JSON.stringify(self.selectedCertification))
      $scope.Certification= ($filter('filter')($scope.Certifying_authorityfliter,{Certification:self.selectedCertification})); 
     }
    }
       
}); 