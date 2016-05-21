var app=angular.module("app");

app.controller("assessmentCtrl",function($scope,$location,$localStorage,$filter,$log,$mdDialog, $mdMedia,$q,$timeout,AssessmentService)
{

      var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    //starting of function for skills type
    self.querySearchskillsType = querySearchskillsType;  
    self.searchskillsTypeChange = searchskillsTypeChange;
    self.selectedskillsTypeChange = selectedskillsTypeChange;
    //ending of function for skills type

    // starting of functions for tags type
    self.searchtagsTypeChange = searchtagsTypeChange;
    self.selectedtagsTypeChange = selectedtagsTypeChange;
    self.querySearchtagsType = querySearchtagsType;

    //end of the functions for tags type

    //starting of functions for complexity type
    self.searchcomplexityTypeChange = searchcomplexityTypeChange;
    self.selectedcomplexityTypeChange = selectedcomplexityTypeChange;
    self.querySearchcomplexityType = querySearchcomplexityType;
    //end of the functions for complexity type

    //starting of functions for questions type
    self.searchquestionsTypeChange = searchquestionsTypeChange;
    self.selectedquestionsTypeChange = selectedquestionsTypeChange;
    self.querySearchquestionsType = querySearchquestionsType;
    //end of functions for question type



  console.log("The assessment controller is called successfully");

  $scope.getassessment=function()
   {
      console.log("get assessment function was called");
     if (!angular.isDefined(activestatus) || !$scope.activestatus)
      {
        console.log("undefined");
        activestatus=false;
      }
      else
      {
       activestatus=$scope.activestatus;
      }
       console.log("The value of activestatus is "+activestatus);

       AssessmentService.getassessment().then(function(response) 
       {
         $scope.assessmentdatas=JSON.stringify(response.data);
         assessmentResponse=response.data;
         //$scope.rajeev = JSON.stringify(response.data);
         console.log("Assessment received from service is"+$scope.assessmentdatas);
         //console.log("skill value received from assessment is"+$scope.rajeev);
         $scope.getSkillsType($scope.assessmentdatas);
         // // $scope.getVendorType(response.data);
         // console.log("Get Skills before calling function List::"+JSON.stringify($scope.skillsdatas));
         // console.log("Get Skills after calling function List::"+JSON.stringify(self.Skillstypedatas));
       });


       // AssessmentService.getSkills().then(function(response) 
       // {
       //   $scope.skillsdatas=response.data;
       //   skillsResponse=response.data;
       //   $scope.getSkillsType(response.data);
       //   // $scope.getVendorType(response.data);
       //   console.log("Get Skills before calling function List::"+JSON.stringify($scope.skillsdatas));
       //   console.log("Get Skills after calling function List::"+JSON.stringify(self.Skillstypedatas));
       // });

       // AssessmentService.getTags().then(function(response) 
       // {
       //   $scope.tagsdatas=response.data;
       //   tagsResponse=response.data;
       //   $scope.getTagsType(response.data);
       //   // $scope.getVendorType(response.data);
       //   console.log("Get Tags before calling function List::"+JSON.stringify($scope.tagsdatas));
       //   console.log("Get Tags after calling function List::"+JSON.stringify($scope.TagsTypeList));
       // });

       // AssessmentService.getComplexity().then(function(response) 
       // {
       //   $scope.complexitydatas=response.data;
       //   complexityResponse=response.data;
       //   $scope.getComplexityType(response.data);
       //   // $scope.getVendorType(response.data);
       //   console.log("Get complexity before calling function List::"+JSON.stringify($scope.complexitydatas));
       //   console.log("Get Tags after calling function List::"+JSON.stringify($scope.ComplexityTypeList));
       // });

       //  AssessmentService.getQuestion().then(function(response) 
       // {
       //   $scope.questionsdatas=response.data;
       //   questionsResponse=response.data;
       //   $scope.getQuestionsType(response.data);
       //   // $scope.getVendorType(response.data);
       //   console.log("Get Questions before calling function List::"+JSON.stringify($scope.questionsdatas));
       //   console.log("Get Questions after calling function List::"+JSON.stringify($scope.QuestionsTypeList));
       // });


   }

   $scope.getSkillsType=function(getResponse)
    {
      console.log("Get skills type function called value is"+getResponse);
      $scope.SkillsTypeList=[];
      
      for(var i= 0;i<getResponse.length;i++)
      {
        if($scope.SkillsTypeList.indexOf(getResponse[i].skill) == -1)
        {
          $scope.SkillsTypeList.push(getResponse[i].skill);
        }
      }
      console.log("Vendor List::"+$scope.SkillsTypeList);
      self.Skillstypedatas=$scope.SkillsTypeList;
      //var skills=$scope.SkillsTypeList
    }



    function querySearchskillsType(query) 
 {
  console.log("function query search skills type was called");
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Skillstypedatas.filter( createFilterFor(query) ) : self.Skillstypedatas,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }

function searchskillsTypeChange(text) 
  {
    console.log("function searchskillsTypeChange was called");
    $log.info('Text changed to ' + text);
   }

   function selectedskillsTypeChange(item) 
    {
      console.log("function selectedskillsTypeChange was called");
      // $log.info('Type changed to ' + JSON.stringify(item));  
      if(item==undefined)
      {
        // $scope.getVendorList=vendorResponse;
        console.log("item is undefined ");
      }
      else{
        console.log("item is defined ");
     }
    }

    $scope.getTagsType=function(getResponse)
    {
      $scope.TagsTypeList=[];
      
      for(var i= 0;i<getResponse.length;i++)
      {
        if($scope.TagsTypeList.indexOf(getResponse[i].tag) == -1)
        {
          $scope.TagsTypeList.push(getResponse[i].tag);
        }
      }
      console.log("Tags List::"+$scope.TagsTypeList);
      self.Tagstypedatas=$scope.TagsTypeList;
      //var skills=$scope.SkillsTypeList
    }

    function querySearchtagsType(query) 
 {
  console.log("function query search tags type was called");
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Tagstypedatas.filter( createFilterFor(query) ) : self.Tagstypedatas,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }

  function searchtagsTypeChange(text) 
  {
    console.log("function searchtagsTypeChange was called");
    $log.info('Text changed to ' + text);
   }

   function selectedtagsTypeChange(item) 
    {
      console.log("function selectedtagsTypeChange was called");
      // $log.info('Type changed to ' + JSON.stringify(item));  
      if(item==undefined)
      {
        // $scope.getVendorList=vendorResponse;
        console.log("item is undefined ");
      }
      else{
        console.log("item is defined ");
     }
    }

    $scope.getComplexityType=function(getResponse)
    {
      $scope.ComplexityTypeList=[];
      
      for(var i= 0;i<getResponse.length;i++)
      {
        if($scope.ComplexityTypeList.indexOf(getResponse[i].complexity) == -1)
        {
          $scope.ComplexityTypeList.push(getResponse[i].complexity);
        }
      }
      console.log("Complexity List::"+$scope.ComplexityTypeList);
      self.Complexitytypedatas=$scope.ComplexityTypeList;
      //var skills=$scope.SkillsTypeList
    }



    function querySearchcomplexityType(query) 
 {
  console.log("function query search complexity type was called");
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Complexitytypedatas.filter( createFilterFor(query) ) : self.Complexitytypedatas,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }

function searchcomplexityTypeChange(text) 
  {
    console.log("function searchcomplexityTypeChange was called");
    $log.info('Text changed to ' + text);
   }

   function selectedcomplexityTypeChange(item) 
    {
      console.log("function selectedcomplexityTypeChange was called");
      // $log.info('Type changed to ' + JSON.stringify(item));  
      if(item==undefined)
      {
        // $scope.getVendorList=vendorResponse;
        console.log("item is undefined ");
      }
      else{
        console.log("item is defined ");
     }
    }

    $scope.getQuestionsType=function(getResponse)
    {
      $scope.QuestionsTypeList=[];
      
      for(var i= 0;i<getResponse.length;i++)
      {
        if($scope.QuestionsTypeList.indexOf(getResponse[i].question) == -1)
        {
          $scope.QuestionsTypeList.push(getResponse[i].question);
        }
      }
      console.log("Questions List::"+$scope.QuestionsTypeList);
      self.Questionstypedatas=$scope.QuestionsTypeList;
      //var skills=$scope.SkillsTypeList
    }



    function querySearchquestionsType(query) 
 {
  console.log("function query search question type was called");
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Questionstypedatas.filter( createFilterFor(query) ) : self.Questionstypedatas,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }

function searchquestionsTypeChange(text) 
  {
    console.log("function searchquestionsTypeChange was called");
    $log.info('Text changed to ' + text);
   }

   function selectedquestionsTypeChange(item) 
    {
      console.log("function selectedquestionsTypeChange was called");
      // $log.info('Type changed to ' + JSON.stringify(item));  
      if(item==undefined)
      {
        // $scope.getVendorList=vendorResponse;
        console.log("item is undefined ");
      }
      else{
        console.log("item is defined ");
     }
    }






function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(res) {
          console.log("sj::"+lowercaseQuery);
          console.log("res::"+res);
         // console.log("skills in skill variable is "+skills);
         return (res.indexOf(query) == 0);
        };

    }

    //   function UpperCase(string) 
    // {  
    //       if(string == null)
    //       {

    //       }
    //       else
    //       {
    //       return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); 
    //       }
    // } 
       
}); 