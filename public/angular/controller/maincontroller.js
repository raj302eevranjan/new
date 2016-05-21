var app=angular.module('app',['ngRoute','ngStorage','ngMaterial','ngMessages','angularUtils.directives.dirPagination','ngSanitize']);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
$routeProvider.
when('/',
{
  templateUrl: 'angular/view/InformalLearning/manage/list.html', 
  controller: 'ILController'
}).
when('/dash1',
{
  templateUrl: 'angular/view/dash1.html', 
  controller: 'dashCtrl1'
}).
when('/vendormanagement',
{
 templateUrl:'angular/view/vendormanagement/vendormanagement.html',
 controller:'vendorCtrl'
}).
when('/assessmentmanagement',
{
 templateUrl:'angular/view/assessmentmanagement/assessment_management.html',
 controller:'assessmentCtrl'
}).
when('/questionbankmanagement',
{
 templateUrl:'angular/view/assessmentmanagement/questionbank_management.html',
 controller:'assessmentCtrl'
}).
when('/vendor',
{
  templateUrl: 'angular/view/VendorManagement/list.html', 
  controller: 'dashctrl'
}).
when('/add_equipmentVendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_equipement_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/add_ilt_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_ilt_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/add_elearn_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_elearn_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/add_mlearn_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_mlearn_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
// start of Stationary vendor
 when('/add_stationary_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
 when('/edit_stationary_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
 // end of stationary vendor
 // Start of Printing vendor
 when('/add_printing_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
 when('/edit_printing_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
 when('/add_f&b_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_f&b_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/add_Travel_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_Travel_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
 // End of Printing vendor
 /*Organization */
when('/mastermOrganization',
{
  templateUrl:'angular/view/mOrganization/Content.html',
  controller:'organizationCtrl'
}).
when('/mEntity',
{
  templateUrl:'angular/view/mOrganization/MasterPages/mEntity.html',
  controller:'organizationCtrl'
}).
when('/mGroup',
{
  templateUrl:'angular/view/mOrganization/MasterPages/mGroup.html',
  controller:'organizationCtrl'
}).
when('/mFunction',
{
  templateUrl:'angular/view/mOrganization/MasterPages/mFunction.html',
  controller:'organizationCtrl'
}).
when('/mDepartment',
{
  templateUrl:'angular/view/mOrganization/MasterPages/mDepartment.html',
  controller:'organizationCtrl'
}).
/*mOrganization Master end*/
when('/mastermLocation',
{
  templateUrl:'angular/view/mLocation/mLocation.html',
  controller:'locationCtrl'
}).
when('/mCountry',
{
 templateUrl:'angular/view/mLocation/Pages/mCountry.html',
 controller:'locationCtrl'
}).
when('/mState',
{
 templateUrl:'angular/view/mLocation/Pages/mState.html',
 controller:'locationCtrl'
}).
when('/mCity',
{
 templateUrl:'angular/view/mLocation/Pages/mCity.html',
 controller:'locationCtrl'
}).
when('/mBuilding',
{
 templateUrl:'angular/view/mLocation/Pages/mBuilding.html',
 controller:'locationCtrl'
}).
when('/mFloor',
{
 templateUrl:'angular/view/mLocation/Pages/mFloor.html',
 controller:'locationCtrl'
}).
when('/mWing',
{
 templateUrl:'angular/view/mLocation/Pages/mWing.html',
 controller:'locationCtrl'
}).

// add curriculum
when('/add_curriculum',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
otherwise({
        redirectTo: '/'
      });

}]);
app.controller('maincontroller',function($scope){
console.log("maincontroller");
})