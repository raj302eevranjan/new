var app=angular.module('app');
var buttonname;
app.factory('WizardService',function () {
return{
  prevaction:function(adddata,currentIndex,menuList,currentPath){
    console.log("prevaction");
      if (currentIndex==0) {
console.log("No Previous any more");
}
if (currentIndex>0) {
currentIndex=currentIndex-1;  
var res=this.stepaction(adddata,currentIndex,menuList,currentPath);
console.log("res::"+res);
return res;
};
      
    },
nextaction:function(adddata,currentIndex,menuList,currentPath){
  var cj=menuList.length-1;
  console.log("menuList.length"+cj);
  console.log("currentIndex"+currentIndex);
      
      if (currentIndex<menuList.length-1) {
        currentIndex=currentIndex+1;

        var res=this.stepaction(adddata,currentIndex,menuList,currentPath);
        console.log("res::"+JSON.stringify(res));
        return res;
      }else{
       var res=this.stepaction(adddata,currentIndex,menuList,currentPath);
        console.log("res::"+JSON.stringify(res));
      }

		},
stepaction:function(adddata,currentIndex,menuList,currentPath){
for(var i=0;i<menuList.length;i++){
if (currentIndex==i) {
var btnid='#btn'+i;
var el =angular.element(btnid);
el.attr('style', 'background-color:orange');
el.removeAttr('disabled','disabled');
var btnid1='#btns'+i;
var e2 =angular.element(btnid1);
e2.attr('style', 'background-color:orange');
}else{
var btnid='#btn'+i;
var el =angular.element(btnid);
el.attr('style', 'background-color:#26a69a');
var btnid1='#btns'+i;
var e2 =angular.element(btnid1);
e2.attr('style', 'background-color:#26a69a');
}
} 
console.log("currentIndex::Step::"+currentIndex);
if (currentIndex==menuList.length-1) {
        buttonname="Submit";
        console.log("Submit");
      }else{
        buttonname="Next";
        console.log("Next");
      } 
  templatepath=currentPath+currentIndex+".html";

var sendbackJson={
  "datas":adddata,  
  "currentindex":currentIndex,
  "templatepath":templatepath,
  "buttonname":buttonname
}
console.log("Re::"+JSON.stringify(sendbackJson));
return sendbackJson;
},

}

});