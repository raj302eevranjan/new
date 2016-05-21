var app=angular.module('app');
app.controller('curriculumCtrl',function($localStorage,$location,$scope,$mdMedia,$mdDialog,$filter)
{     console.log($location.path())
    $localStorage.currentPath="add_curriculum";
    console.log("add_curriculum");
   
   $scope.Course=[{"course":"C Program"},
                   {"course":"C++ Program"},
                   {"course":"Java Program"},
                   {"course":"Introduction to HTML"},
                   {"course":"Introduction to CSS"},
                   {"course":"Introduction to JS"},
                   {"course":"Introduction to Angular JS"},
                   {"course":"Introduction to Node JS"}];
   
    /*add Courses*/
    $scope.selectCourse=[];
 $scope.addCourses = function(ev) {

  // $scope.carrymodel.addcomp=true;
  console.log(JSON.stringify($scope.Course));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller :CurriculumController,
      templateUrl: 'angular/view/dialog_add_Course.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals: {
        items: $scope.Course
     }
    })
    .then(function(answer) {

      console.log("ok"+JSON.stringify(answer));
      $scope.carrymodel.selectCourse_data=answer;
      $scope.number=$scope.carrymodel.selectCourse_data.length;
       // $scope.carrymodel.selectCourse_data.length  
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
$scope.Course_checkOne=function(vindex){
console.log(JSON.stringify($scope.Course));
}
$scope.Course_checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;

        } else {
            $scope.selectedAll = false;
        }
        
        angular.forEach($scope.Course, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log("$scope.Course::"+JSON.stringify($scope.Course));
    };
    $scope.Course_saveAction=function(){
      console.log(JSON.stringify($scope.Course));
      for(var i=0;i<$scope.Course.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.Course[i].Selected));
        if ($scope.Course[i].Selected==false || !angular.isDefined($scope.Course[i].Selected)) {}else{
        $scope.selectCourse.push($scope.Course[i]);
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.selectCourse));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.selectCourse);
    }
    $scope.removeCourse=function(vindex){
      $scope.carrymodel.selectCourse_data.splice(vindex,1);
    }

 function CurriculumController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  } 
 
 /*move array*/
 $scope.CourseMoveup=function(index)
 { console.log(JSON.stringify(index))
 	if(index==0)
 	{
   
 	}
   else{
  $scope.carrymodel.selectCourse_data.move(index,index-1);
   }
   	
 }
 $scope.CourseMovedown=function(index)
 {
 		$scope.carrymodel.selectCourse_data.move(index,index+1);	
 }
Array.prototype.move = function(from,to){

  this.splice(to,0,this.splice(from,1)[0]);
  return this;
};
$scope.mandatory_array=[];
$scope.CourseMandatory=function(Mandatory)
{
	if(Mandatory==true)
	{
		$scope.mandatory_array.push({"mandatory":Mandatory});
	}
	else{
		$scope.mandatory_array.pop();
	}
	
	// console.log(JSON.stringify($scope.mandatory_array))
  // $scope.mandatory_value=($filter('filter')($scope.mandatory_array,{mandatory:true}));
   console.log(JSON.stringify($scope.mandatory_array.length));
}

});