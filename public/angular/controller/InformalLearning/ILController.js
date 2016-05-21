var app=angular.module("app");
var MasterResponse=[];
var l=0;
var addFlag=0;
var editFlag=0;
var editJson={};
app.directive('httpPrefix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                if(value && !/^(https?):\/\//i.test(value)
                   && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0 ) {
                    controller.$setViewValue('http://' + value);
                    controller.$render();
                    return 'http://' + value;
                }
                else
                    return value;
            }
            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.splice(0, 0, ensureHttpPrefix);
        }
    };
});
app.controller("ILController",function($scope,$location,$localStorage,$routeParams,ILService,authService,$q,$log,$timeout,$http,$sce){

console.log("ILController");
$scope.progressValue=10;
$scope.showProgress=false;
$localStorage.editonlypass="";

   if (addFlag==1) {
    addFlag=0;
    $location.path('/iladd');
   }else if(editFlag==1){
    editFlag=0;
    $location.path('/iledit');
   }else{
    $location.path('/');
   }

	var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;

    self.querySearchCompetency   = querySearchCompetency;
    self.selectedCompetencyChange = selectedCompetencyChange;
    self.searchCompetencyChange   = searchCompetencyChange;

    self.querySearchSubcompetency   = querySearchSubcompetency;
    self.selectedSubcompetencyChange = selectedSubcompetencyChange;
    self.searchSubcompetencyChange   = searchSubcompetencyChange;

    //Tags
    self.tags=[];

    $scope.types=['Video','Audio','E-Book','URL','Image','Document'];

$scope.compInit=function(){
    if (!angular.isDefined($scope.carrymodel.tags)) {
      $scope.carrymodel.tags=[];
    };

  }
$scope.getMaster=function(){
	ILService.getCompetency().then(function(response){
		if (response) {
			console.log("Res::"+JSON.stringify(response.data));
			MasterResponse=response.data;
			$scope.getCompetency(response.data);
			console.log("MasterResponse::"+JSON.stringify(MasterResponse));
		};

	})
	
}
$scope.getMaster();
$scope.getCompetency=function(getResponse){
	$scope.CompetencyList=[];
	for (var i = 0;i<getResponse.length;i++) {
		if ($scope.CompetencyList.indexOf(getResponse[i].competency) == -1) {
		$scope.CompetencyList.push(getResponse[i].competency);
		}
	};

	console.log("competency List::"+$scope.CompetencyList);
	console.log("selectedItem");
	self.competencies=$scope.CompetencyList;


}
$scope.getSubcompetency=function(SelectedCompetency,getResponse){
	
	console.log("subc get::"+JSON.stringify(getResponse));
	console.log("subc get::"+SelectedCompetency);
	$scope.SubcompetencyList=[];
	for (var i = 0;i<getResponse.length;i++) {
		console.log(SelectedCompetency+"="+getResponse[i].competency);
		if (SelectedCompetency==getResponse[i].competency) {
			if ($scope.SubcompetencyList.indexOf(getResponse[i].sub_competency) == -1) {
				$scope.SubcompetencyList.push(getResponse[i].sub_competency);
				}
		};
	};
	self.subcompetencies=$scope.SubcompetencyList;
	console.log("Subcompetency List::"+self.subcompetencies);
}
$scope.getSkills=function(SelectedSubcompetency,getResponse){
	console.log("subc get::"+JSON.stringify(getResponse));
	console.log("subc get::"+SelectedSubcompetency);
	$scope.SkillsList=[];
	for (var i = 0;i<getResponse.length;i++) {
		console.log(SelectedSubcompetency+"="+getResponse[i].sub_competency);
		if (SelectedSubcompetency==getResponse[i].sub_competency) {
			if ($scope.SkillsList.indexOf(getResponse[i].skills) == -1) {
				$scope.SkillsList.push(getResponse[i].skills);
				}
		};
	};
	
	return $scope.SkillsList;
	console.log("Skills List::"+$scope.SkillsList);
}
    function querySearchCompetency (query) {
	  console.log("sr::"+query); 

      var results = query ? self.competencies.filter( createFilterFor(query) ) : self.competencies,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    
   function selectedCompetencyChange(item) {
      $log.info('Competency changed to ' + JSON.stringify(item));
      	$scope.carrymodel.competency=self.selectedCompetency;
      	$scope.checkValid();
      	
    }
    function searchCompetencyChange(text) {
      $log.info('Text changed to ' + text);
      if (text=="") {
      	self.selectedCompetency=$scope.carrymodel.competency="";
      	self.searchCompetency="";
      	self.selectedSubcompetency=$scope.carrymodel.sub_competency="";
      	self.searchSubcompetency="";
        self.asyncContacts=$scope.carrymodel.skills=[];

       }
       else{
       	$scope.carrymodel.competency=self.selectedCompetency;
       }
    }

    //Sub Competency 
     function querySearchSubcompetency (query) {
	  console.log("sr::"+query); 
if (query==null || query=="") {
	  	$scope.getSubcompetency($scope.carrymodel.competency,MasterResponse);
	  }
      var results = query ? self.subcompetencies.filter( createFilterFor(query) ) : self.subcompetencies,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    
   function selectedSubcompetencyChange(item) {
      $log.info('Subcompetency changed to ' + JSON.stringify(item));
      	$scope.carrymodel.competency=self.selectedCompetency;
      	$scope.carrymodel.sub_competency=item;
      	console.log("selected subcompetencies::"+$scope.carrymodel.sub_competency);
      	$scope.checkValid();
    }
    function searchSubcompetencyChange(text) {
      $log.info('Text changed to ' + text);
      if (text=="") {
      	
      	self.selectedSubcompetency=$scope.carrymodel.sub_competency="";
      	self.searchSubcompetency="";
        self.asyncContacts=$scope.carrymodel.skills=[];
      	
       }
       else{
       	$scope.carrymodel.sub_competency=self.selectedSubcompetency;
       }
    }


    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(res) {
      	console.log("sj::"+lowercaseQuery);
        return (res.indexOf(query) == 0);
      };
  }






//MD CHIPS STARTS-SKILLS
var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;
    
    self.asyncContacts = [];
    self.filterSelected = true;
    self.querySearch = querySearch;
    self.delayedQuerySearch = delayedQuerySearch;

if ($location.path()=="/iladd") {
  $scope.carrymodel.intellect=true;
  $scope.carrymodel.urltype="Online";
  $scope.carrymodel.activestatus=false;
  $scope.carrymodel.radioStatus=false;
}else if ($location.path()=="/iledit") {
  $scope.carrymodel=editJson;
  if ($scope.carrymodel.urltype=="Local") {
    $scope.carrymodel.localurl=editJson.filePath;
  }else if($scope.carrymodel.urltype=="Online"){
    $scope.carrymodel.onlineurl=editJson.filePath;
  }
  self.selectedCompetency=$scope.carrymodel.competency;
    self.selectedSubcompetency=$scope.carrymodel.sub_competency;
   self.asyncContacts=$scope.carrymodel.skills;
   if ($scope.carrymodel.uploadType=="Video") {
      $scope.showVideo=true;
      $scope.showAudio=false;
      $scope.showImage=false;
    };
  console.log("CarryModel::"+JSON.stringify($scope.carrymodel));
}
 function querySearch (criteria) {
 	self.allContacts = loadContacts();
    self.contacts = [self.allContacts[0]];
      cachedQuery = cachedQuery || criteria;
      $scope.carrymodel.skills=self.asyncContacts;
      console.log("skills="+JSON.stringify($scope.carrymodel.skills));
      return cachedQuery ? self.allContacts.filter(createFilterFor(cachedQuery)) : [];
    }

    function delayedQuerySearch(criteria) {
      cachedQuery = criteria;
      if ( !pendingSearch || !debounceSearch() )  {
        cancelSearch();
        return pendingSearch = $q(function(resolve, reject) {
          // Simulate async search... (after debouncing)
          cancelSearch = reject;
          $timeout(function() {
            resolve( self.querySearch() );
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
    /**
     * Debounce if querying faster than 300ms
     */
    function debounceSearch() {
      var now = new Date().getMilliseconds();
      lastSearch = lastSearch || now;
      return ((now - lastSearch) < 300);
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);;
      };
    }
    function loadContacts() {
      var contacts =$scope.getSkills($scope.carrymodel.sub_competency,MasterResponse);
      return contacts.map(function (c, index) {
        var cParts = c.split(' ');
        var contact = {
          name: c
        };
        contact._lowername = contact.name.toLowerCase();
        return contact;
      });
    }


//MD CHIPS END -SKILLS



$scope.radioChange=function(){
	console.log("radio="+$scope.carrymodel.urltype);
	console.log("before="+JSON.stringify($scope.carrymodel));
		$scope.carrymodel.radioStatus=!$scope.carrymodel.radioStatus;
		if ($scope.carrymodel.urltype=="Local") {
			// $scope.carrymodel.onlineurl="";
      delete $scope.carrymodel.onlineurl;
		}else if ($scope.carrymodel.urltype=="Online") {
			delete $scope.carrymodel.localurl;
      delete $scope.carrymodel.localfile;
		};
		console.log("After="+JSON.stringify($scope.carrymodel));
$scope.checkValid();
}
  
$scope.browseClick=function(){
	$scope.kok=false;
	console.log(JSON.stringify($scope.carrymodel));
	$scope.checkValid();
}
$scope.uploadClick=function(){

  $scope.kok=true;
	console.log(JSON.stringify($scope.carrymodel));
	if ($scope.carrymodel.urltype=="Local") {
    var fd = new FormData();
  fd.append('images', $scope.carrymodel.localfile);
  
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/upload', true);
  
  xhr.upload.onprogress = function(e) {
  if (e.lengthComputable) {
  var percentage = (e.loaded / e.total) * 100;
    $scope.$apply(function() {
    $scope.progressValue=percentage.toFixed(1);
    if ($scope.progressValue>0 && $scope.progressValue<=100) {
      $scope.showProgress=true;
    }else{
      $scope.showProgress=false;
    }
    }); 
    console.log("Percentage::"+$scope.progressValue);
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
  console.log(JSON.stringify(this));
  $scope.$apply(function() {
  $scope.showProgress=false;

}); 

  
};

xhr.send(fd);
 var promise = $http.post("/upload", fd, {
                              withCredentials: false,
                              headers: {
                                'Content-Type': undefined
                              },
                              transformRequest: angular.identity,
                              params: {
                                fd
                              },
                              // responseType: "arraybuffer"
                            })
                            .success(function(response, status, headers, config) {
                             console.log(JSON.stringify(response));
                             if (response) {
                              $scope.carrymodel.filePath=response.imgPath;
                               if ($location.path()=='/iladd') {
 
 ILService.addLocalIL($scope.carrymodel).then(function(res){
                                console.log("Insert Res"+JSON.stringify(res));
                                if (res) {
                                  $location.path("/ilmanage");
                                };
                                
                              })
}else if ($location.path()=='/iledit'){
ILService.editLocalIL($scope.carrymodel).then(function(res){
                                console.log("Edit Res"+JSON.stringify(res));
                                if (res) {
                                  $location.path("/ilmanage");
                                };
                                
                              })
}

                              
                             };
                            })
                            .error(function(error, status, headers, config) {
                              console.log(error);
                            });
          // Return the promise to the controller
          return promise;
 
  }else if ($scope.carrymodel.urltype=="Online") {
    ILService.addOnlineIL($scope.carrymodel).then(function(res){
                                console.log("Insert Res"+JSON.stringify(res));
                                if (res) {
                                  $location.path("/ilmanage");
                                };
                                
                              })
  }

}

$scope.checkValid=function(){
  if ($scope.carrymodel.urltype=="Online") {
    if ($scope.carrymodel.title=="" 
    || $scope.carrymodel.description==""  
    || $scope.carrymodel.onlineurl==""
    || $scope.carrymodel.intellect==false
    || !(angular.isDefined($scope.carrymodel.title))
    || !(angular.isDefined($scope.carrymodel.description))
    || !(angular.isDefined($scope.carrymodel.onlineurl))
    || !(angular.isDefined($scope.carrymodel.intellect))) {
    $scope.validcheck=false;
  }else{
    $scope.validcheck=true;
  }
  console.log("checkValid"+$scope.validcheck);
  console.log("scope"+JSON.stringify($scope.carrymodel));
  }else if($scope.carrymodel.urltype=="Local"){
    if ($scope.carrymodel.title=="" 
    || $scope.carrymodel.description==""  
    || $scope.carrymodel.localurl==""
    || $scope.carrymodel.intellect==false
    || !(angular.isDefined($scope.carrymodel.title))
    || !(angular.isDefined($scope.carrymodel.description))
    || !(angular.isDefined($scope.carrymodel.localurl))
    || !(angular.isDefined($scope.carrymodel.intellect))) {
    $scope.validcheck=false;
  }else{
    $scope.validcheck=true;
  }
  console.log("checkValid"+$scope.validcheck);
  console.log("scope"+JSON.stringify($scope.carrymodel));
  }
}




//Manage
//getVenue list
$scope.getIL=function(){
  // console.log("activestatus"+$scope.activestatus);

ILService.getIL(false).then(function(response) {
$scope.getILList=response.data;
console.log("Get IL List::"+JSON.stringify($scope.getILList));
});

}
$scope.addIL=function(){
  console.log("Add IL");
  $localStorage.currentPath=$location.path();
  addFlag=1;
    $location.path("/iladd");
  
}
//Active status
$scope.changeActiveStatus=function(){
  $scope.carrymodel.activestatus=!$scope.carrymodel.activestatus;
  $scope.getIL();
}

$scope.activeIL=function(item){
var activeItem=item;
console.log("Active/Inactive::"+JSON.stringify(activeItem));
ILService.activeIL(activeItem).then(function(response) {
$scope.getIL();
}); 
}
$scope.removeIL=function(item){
  console.log("Remove Venue");
  var removeItem=item;
console.log("Clicked::"+JSON.stringify(removeItem));
ILService.removeIL(removeItem).then(function(response) {
$scope.getIL();
});
}
$scope.editIL=function(item){ 

$localStorage.currentPath=$location.path();
$localStorage.editonlypass="";
editFlag=1;
  editJson=item;
  console.log("edit IL::"+JSON.stringify(editJson));
    $location.path("/iledit");
}

$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  // $scope.movie = {src:$scope.carrymodel.filePath, title:"k"};
});
