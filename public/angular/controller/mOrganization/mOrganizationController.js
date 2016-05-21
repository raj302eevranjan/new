var app=angular.module("app");
app.controller("organizationCtrl",function($scope,$location,$filter,mOrgService)
{   
   
  $scope.masters=['Entity','Group','Function','Department'];
   var self = this; 
   $scope.dis_group=true;
   $scope.dis_function=true;
   $scope.dis_entity=false;
   $scope.editentity=1;
   $scope.editgroup=1;
   $scope.editfunction=1;
   $scope.editdepartment=1;

   $scope.action_name="Add";
   // Entity
    self.querySearchEntity   = querySearchEntity;
    self.selectedEntityChange = selectedEntityChange;
    self.searchEntityChange   = searchEntityChange;
    // Group
    self.querySearchGroup   = querySearchGroup;
    self.selectedGroupChange = selectedGroupChange;
    self.searchGroupChange   = searchGroupChange;
    // Group
    self.querySearchFunction   = querySearchFunction;
    self.selectedFunctionChange = selectedFunctionChange;
    self.searchFunctionChange   = searchFunctionChange;


/*Org*/
 $scope.getOrganization=function()
 {  
   mOrgService.getOrganization().then(function(response) {
    if(response)
    {
   $scope.mOrganization=response.data;
    // $scope.mOrganizationdata= $scope.mOrganization;
    // $scope.contentdata();
    OrganizationResponse=response.data;
    $scope.getEntitydata(response.data);
    $scope.contentdata(response.data)
     }  
    console.log("OrganizationResponse::"+JSON.stringify(OrganizationResponse));
    }); 
  }
  $scope.getOrganization();

  
   /*bhuvanesh*/
   $scope.getEntitydata=function(getResponse)
   {
      $scope.EntityList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
       if ($scope.EntityList.indexOf(getResponse[i].mentity) == -1) 
        {
         $scope.EntityList.push(getResponse[i].mentity);
        }
     }
       console.log("Entity List::"+$scope.EntityList);
      self.Entitydata=$scope.EntityList;
   }

   function querySearchEntity (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Entitydata));
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Entitydata.filter( createFilterFor(query) ) : self.Entitydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchEntityChange(text)
    {    
      $scope.Entity=OrganizationResponse;
              console.log('Text changed to ' + text);
       
    }
  function selectedEntityChange(item) {
    console.log("Item"+JSON.stringify(item));
    $scope.selectedEntitydata=item;
    if(item ==undefined)
    {    
          $scope.Entity=OrganizationResponse;
           
           $scope.dis_group=true;
           $scope.dis_function=true;   
           self.selectedGroup="";
           self.searchGroup="";
           $scope.GroupList="";
           $scope.mOrg="";
           self.selectedFunction="";
          self.searchFunction="";

    }
   else
      { 
        if($scope.editfunction==0 || $scope.editdepartment==0)
        {
          $scope.dis_group=true;
        }
        else
        {
          $scope.dis_group=false;
        }
       
      self.selectedEntity=item;
       $scope.getGroupdata(self.selectedEntity,OrganizationResponse)
     }
    }

    /*Group*/
     $scope.getGroupdata=function(Selecteditem,getResponse)
   {
      $scope.GroupList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
      console.log(JSON.stringify(Selecteditem))
      if(getResponse[i].mentity==Selecteditem)
      { 
       
        
         if (getResponse[i].mgroup) 
          {  
             console.log("Group length::"+JSON.stringify(getResponse[i].mgroup.length))
            for(j=0;j<getResponse[i].mgroup.length;j++)
            { 
               console.log("mgroup"+JSON.stringify(getResponse[i].mgroup[j].mgroup))
              $scope.GroupList.push(getResponse[i].mgroup[j].mgroup);
             }
          }
       }
       console.log("Group List data::"+JSON.stringify($scope.GroupList));
     }
       

       self.Groupdata=$scope.GroupList;
   }

   function querySearchGroup (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Groupdata));
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Groupdata.filter( createFilterFor(query) ) : self.Groupdata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchGroupChange(text)
    { 

      $scope.Group=OrganizationResponse;
      console.log('Text changed to ' + text);
       
    }
  function selectedGroupChange(item) {
    console.log("Item"+JSON.stringify(item));
    $scope.selectedGroupdata=item;
    if(item ==undefined)
    {    
          $scope.Group=OrganizationResponse;   
          self.selectedGroup="";
          self.searchGroup="";
          self.selectedFunction="";
          self.searchFunction="";
           $scope.dis_function=true; 
    }
   else
      {  
        if($scope.editfunction==0 || $scope.editdepartment==0)
        {
          $scope.dis_function=true;
        }
        else
        {
          $scope.dis_function=false; 
        }
           
        $scope.selectedGroupdata=item;
        self.selectedGroup=item;
        $scope.getFunctiondata(self.selectedGroup,OrganizationResponse)
     }
    }

    /*Function*/
     
     $scope.getFunctiondata=function(Selecteditem,getResponse)
   {  
    console.log(JSON.stringify(Selecteditem))
      $scope.FunctionList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
      console.log("response data::"+JSON.stringify(getResponse[i])); 
      if(getResponse[i].mfunction)
      {   
        
      console.log("function length::"+JSON.stringify(getResponse[i].mfunction.length));
           for(j=0;j<getResponse[i].mfunction.length;j++)
           { 
            if(getResponse[i].mfunction[j].mgroup==Selecteditem)
            {
            $scope.FunctionList.push(getResponse[i].mfunction[j].mfunction);
            }
           }
         
       
       }
     }
       console.log("Function List::"+JSON.stringify($scope.FunctionList));

       self.Functiondata=$scope.FunctionList;
   }

   function querySearchFunction (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Functiondata));
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Functiondata.filter( createFilterFor(query) ) : self.Functiondata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchFunctionChange(text)
    {    
      $scope.Function=OrganizationResponse;
     console.log('Text changed to ' + text); 
    }
  function selectedFunctionChange(item) {
    console.log("Item"+JSON.stringify(item));
    $scope.selectedFunctiondata=item;
    if(item ==undefined)
    {    
          $scope.Function=OrganizationResponse;   
    }
   else
      {
        $scope.selectedFunctiondata=item;
       self.selectedFunction=item;
     }
    }

   function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(res) {
          console.log("sj::"+lowercaseQuery);
          return (res.indexOf(query) == 0);
        };

    }

  $scope.addMasterdata=function(masterType)
  {
       console.log(JSON.stringify(masterType));
  if(masterType == 'Entity')
  {
        console.log(JSON.stringify($scope.selectedMaster))
         // $scope.template='angular/views/mOrganization/MasterPages/mEntity.html';
        $location.path('/mEntity');
  }
  else if(masterType == 'Group')
  {
        console.log(JSON.stringify($scope.selectedMaster))
        // $scope.template='angular/views/mOrganization/MasterPages/mGroup.html';
        $location.path('/mGroup');
  }
  else if(masterType == 'Function')
  {     
        // $scope.template='angular/views/mOrganization/MasterPages/mFunction.html';
          console.log(JSON.stringify($scope.selectedMaster))
          $location.path('/mFunction');
  }
  else if(masterType == 'Department')
  {
            console.log(JSON.stringify($scope.selectedMaster))
            // $scope.template='angular/views/mOrganization/MasterPages/mDepartment.html';
            $location.path('/mDepartment');
  }
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
  $scope.addEntity=function(mentity)
  {
    console.log("addEntity"+JSON.stringify(mentity));
    if($scope.action_name=="Add")
    { 
      console.log("Add");
      var data={};
      data.mentity=mentity;
        mOrgService.addEntity(data).then(function(response)
        {   $scope.mentity="";
              $scope.getOrganization();
            console.log(JSON.stringify(response));
        });
   }
   else
   { 
    console.log("Update")
   $scope.mOrganizationdata= $scope.mOrganization;
  // $scope.mOrganization.mentity
   for(var i=0;i<$scope.mOrganizationdata.length;i++)
   {     
    console.log("data id::"+JSON.stringify($scope.mOrganizationdata[i]._id));
       if($scope.mOrganizationdata[i]._id == $scope.entity_id)
       {
      $scope.mOrganizationdata[i].mentity=mentity;
     if($scope.mOrganizationdata[i].mgroup)
     {  
      for(var j=0;j<$scope.mOrganizationdata[i].mgroup.length;j++)
      { 
        console.log("Group enttity data"+JSON.stringify($scope.mOrganizationdata[i].mgroup[j].mentity))
        $scope.mOrganizationdata[i].mgroup[j].mentity=mentity;
        $scope.changed=$scope.mOrganizationdata[i].mgroup;
      }

      }
      if($scope.mOrganizationdata[i].mfunction)
      {
        for(var k=0;k<$scope.mOrganizationdata[i].mfunction.length;k++)
        {
          console.log("Function enttity data"+JSON.stringify($scope.mOrganizationdata[i].mfunction[k].mentity))
        $scope.mOrganizationdata[i].mfunction[k].mentity=mentity;
        }
      }
      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
          console.log("Department enttity data"+JSON.stringify($scope.mOrganizationdata[i].mdepartment[l].mentity))
        $scope.mOrganizationdata[i].mdepartment[l].mentity=mentity;
        $scope.changeddata=$scope.mOrganizationdata[i];
       
        }
      }
      
   console.log("changeddata"+JSON.stringify($scope.changeddata)); 
    mOrgService.updatedata($scope.changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
       $scope.getOrganization();
      $scope.mentity="";
      $scope.action_name="Add";
      $scope.editentity=1;
     });
     };
      
  }
   }
   

   }
  /*2*/
    $scope.addGroup=function()
  {  
    if($scope.action_name=="Add")
    {
    var data={};
   data.mentity=$scope.selectedEntitydata;
   data.mgroup=$scope.mgroup;
   console.log("AddGroup::"+JSON.stringify(data));
    mOrgService.addGroup(data).then(function(response)
    {    self.searchEntity="";
        self.selectedEntity="";
        $scope.mgroup="";
        console.log(JSON.stringify(response));
        $scope.getOrganization();
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
        {
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
  }


/*sort entity*/
 $scope.vsortEntity=true;
$scope.EntitySortIcon="arrow_drop_down";
$scope.sortEntity=function(){
  if ($scope.vsortEntity==true) {
    $scope.orderList = "mentity";
    $scope.vsortEntity=false;
    $scope.EntitySortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-mentity";
    $scope.vsortEntity=true;
    $scope.EntitySortIcon="arrow_drop_down";
  }
}
/*sort group*/
$scope.vsortGroup=true;
$scope.GroupSortIcon="arrow_drop_down";
$scope.sortGroup=function(){
  if ($scope.vsortGroup==true) {
    $scope.orderList = "mgroup";
    $scope.vsortGroup=false;
    $scope.GroupSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-mgroup";
    $scope.vsortGroup=true;
    $scope.GroupSortIcon="arrow_drop_down";
  }
}

/*sort function*/
$scope.vsortFunction=true;
$scope.FunctionSortIcon="arrow_drop_down";
$scope.sortFunction=function(){
  if ($scope.vsortFunction==true) {
    $scope.orderList = "mfunction";
    $scope.vsortFunction=false;
    $scope.FunctionSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-mfunction";
    $scope.vsortFunction=true;
    $scope.FunctionSortIcon="arrow_drop_down";
  }
}
/*sort department*/
$scope.vsortDepartment=true;
$scope.DepartmentSortIcon="arrow_drop_down";
$scope.sortDepartment=function(){
  if ($scope.vsortDepartment==true) {
    $scope.orderList = "mdepartment";
    $scope.vsortDepartment=false;
    $scope.DepartmentSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-mdepartment";
    $scope.vsortDepartment=true;
    $scope.DepartmentSortIcon="arrow_drop_down";
  }
}

$scope.activeEntity=function(item)
{
  mOrgService.activeEntity(item).then(function(response)
  { 
      console.log(JSON.stringify(response));
      $scope.getOrganization();
      
  });
}
$scope.editEntity=function(item)
{  
  $scope.editentity=0;
  $scope.mentity=item.mentity;
  $scope.action_name="Update";
  $scope.entity_id=item._id;
  $scope.entity_old=item.mentity;

  console.log("id"+JSON.stringify($scope.entity_id));
  console.log("data"+JSON.stringify($scope.entity_old))
  
}
$scope.cancelEntity=function()
{
  $scope.editentity=1;
  $scope.action_name="Add";
  $scope.mentity="";
}

$scope.removeEntity=function(data)
{
   mOrgService.removeEntity(data).then(function(response)
   {
       console.log(JSON.stringify(response));
       $scope.getOrganization();
   });
}


$scope.contentdata=function(data)
{  console.log("Inside contet data")

  $scope.mResponsedata=data;
  $scope.Groupdata=[];
  $scope.Functiondata=[];
  for(var i=0;i<$scope.mResponsedata.length;i++)
   {     
           console.log("data id::"+JSON.stringify($scope.mResponsedata[i]._id));
           // console.log("id::"+JSON.stringify($scope.entity_id))
       
     if($scope.mResponsedata[i].mgroup)
     {   
      for(var j=0;j<$scope.mResponsedata[i].mgroup.length;j++)
      { 
       $scope.Groupdata.push($scope.mResponsedata[i].mgroup[j]);
       
      }
        
      }
      if($scope.mResponsedata[i].mfunction)
      {
        for(var k=0;k<$scope.mResponsedata[i].mfunction.length;k++)
        {
          $scope.Functiondata.push($scope.mResponsedata[i].mfunction[k]);
        }
      }
      if($scope.mResponsedata[i].mdepartment)
      {
        for(var l=0;l<$scope.mResponsedata[i].mdepartment.length;l++)
        {
        $scope.changeddata=$scope.mResponsedata[i]; 
        $scope.Departmentdata=$scope.mResponsedata[i].mdepartment;
       
        }
      }
   
    }
}
 /*get id bhuvanesh*/
  $scope.getid=function(data)
  { 
    for(i=0;i<$scope.mOrganization.length;i++)
    {   /*alert(JSON.stringify(data.mentity))*/
      if(data.mentity==$scope.mOrganization[i].mentity)
      {  
        /*getting id for selected data*/
         $scope.data_id= $scope.mOrganization[i]._id;
      }
      
    }
    
  }

/*edit group*/
$scope.editGroup=function(data)
{  
   $scope.passgroupdata=data;
   $scope.action_name="Update"
   $scope.editgroup=0;
   $scope.mgroup=data.mgroup; 
   self.selectedEntity=data.mentity;
   $scope.dis_entity=true;
   $scope.GroupEditdata=data.mgroup;
}

$scope.cancelGroup=function()
{
  $scope.editgroup=1;
  self.searchEntity="";
  self.selectedEntity="";
  $scope.mgroup=""; 
  $scope.dis_entity=false; 
}
$scope.activeGroup=function(data)
{ 
  $scope.getid(data);
  $scope.activegroupdata(data)
}

$scope.activegroupdata=function(data)
{  
   $scope.mOrganizationdata= $scope.mOrganization;
   $scope.mOrganizationdata.id=$scope.data_id;
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
        if($scope.mOrganizationdata[i].mgroup[j].mgroup==data.mgroup)
        { 
          if($scope.mOrganizationdata[i].mgroup[j].status==1)
          {
             $scope.mOrganizationdata[i].mgroup[j].status=0;
          }
          else
          {
            $scope.mOrganizationdata[i].mgroup[j].status=1;
          }
          
        } 
      }
      }
      if($scope.mOrganizationdata[i].mfunction)
      {
        for(var k=0;k<$scope.mOrganizationdata[i].mfunction.length;k++)
        {
          if($scope.mOrganizationdata[i].mfunction[k].mgroup==data.mgroup)
        {   
          if($scope.mOrganizationdata[i].mfunction[k].status==1)
          {
             $scope.mOrganizationdata[i].mfunction[k].status=0;
          }
          else{
             $scope.mOrganizationdata[i].mfunction[k].status=1;
          }
         
        }
        }
      }
      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
           if($scope.mOrganizationdata[i].mdepartment[l].mgroup==data.mgroup)
        {  

          if($scope.mOrganizationdata[i].mdepartment[l].status==1)
          {
            $scope.mOrganizationdata[i].mdepartment[l].status=0;
          }
          else
          {
            $scope.mOrganizationdata[i].mdepartment[l].status=1;
          }
          
        }
        }
      }
    }
    $scope.changeddata=$scope.mOrganizationdata[i];
    mOrgService.activedata($scope.changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
      
       $scope.getOrganization();
        
     });
  } 
 }
/*end of active inactive*/   
$scope.removeGroup=function(data)
{
  console.log(JSON.stringify(data));

  $scope.getid(data);
  $scope.mOrganizationdata= $scope.mOrganization;
   $scope.mOrganizationdata.id=$scope.data_id;
   for(var i=0;i<$scope.mOrganizationdata.length;i++)
   {     
    
       if($scope.mOrganizationdata[i]._id == $scope.data_id)
       {
       console.log(JSON.stringify($scope.mOrganizationdata[i]));
     if($scope.mOrganizationdata[i].mgroup)
     {  
      for(var j=0;j<$scope.mOrganizationdata[i].mgroup.length;j++)
      {   

        if($scope.mOrganizationdata[i].mgroup[j].mgroup==data.mgroup)
        {    
          $scope.mOrganizationdata[i].mgroup.splice(j, 1);
          j--;
            
        };

      }
      $scope.Group_fliterd_data=$scope.mOrganizationdata[i].mgroup;
      }
      if($scope.mOrganizationdata[i].mfunction)
      {
        for(var k=0;k<$scope.mOrganizationdata[i].mfunction.length;k++)
        {
          if($scope.mOrganizationdata[i].mfunction[k].mgroup==data.mgroup)
        {   
         $scope.mOrganizationdata[i].mfunction.splice(k,1);
         k--; 
        };
        }
         $scope.Function_fliterd_data=$scope.mOrganizationdata[i].mfunction;
      }

      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
           if($scope.mOrganizationdata[i].mdepartment[l].mgroup==data.mgroup)
        {  
          $scope.mOrganizationdata[i].mdepartment.splice(l, 1);
          l--;
          
        };
        }
        $scope.Department_fliterd_data=$scope.mOrganizationdata[i].mdepartment;
      }
      var changeddata={};
      changeddata._id=$scope.data_id;
    changeddata.mentity=data.mentity;
    changeddata.mgroup= $scope.Group_fliterd_data;
    changeddata.mfunction= $scope.Function_fliterd_data;
    changeddata.mdepartment= $scope.Department_fliterd_data;
     console.log(JSON.stringify(changeddata))
    mOrgService.removedata(changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
       $scope.getOrganization();   
     });
    }
    
  } 
}

$scope.addFunction=function(data)
 {  

 if($scope.action_name=="Add")
    { 
          var selectedEntitydata= $scope.selectedEntitydata;
       var selectedGroupdata =$scope.selectedGroupdata;
       var sendData={};
       sendData.mentity=$scope.selectedEntitydata;
       sendData.mgroup=$scope.selectedGroupdata;
       sendData.mfunction=data;
       console.log(JSON.stringify(sendData));
       mOrgService.addFunction(sendData).then(function(response)
       {
            self.searchEntity="";
            self.selectedEntity="";
            self.searchGroup="";
            self.searchGroup="";
            $scope.mfunction="";
            console.log(JSON.stringify(response));
            $scope.getOrganization();
       });
     }
     else
     {

       $scope.getid($scope.passgroupdata);
       $scope.mOrganizationdata= $scope.mOrganization;
        console.log("Update data"+JSON.stringify($scope.mOrganizationdata));
   // $scope.mOrganization.mentity
   for(var i=0;i<$scope.mOrganizationdata.length;i++)
   {     
    console.log("data id::"+JSON.stringify($scope.mOrganizationdata[i]._id));
    console.log("id::"+JSON.stringify($scope.data_id))
       if($scope.mOrganizationdata[i]._id == $scope.data_id)
       {  
      if($scope.mOrganizationdata[i].mfunction)
      { 
        
        for(var k=0;k<$scope.mOrganizationdata[i].mfunction.length;k++)
        {
          if($scope.mOrganizationdata[i].mfunction[k].mfunction==$scope.FunctionEditdata)
        {
          $scope.mOrganizationdata[i].mfunction[k].mfunction=$scope.mfunction;
        }
        }
      }
      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
           if($scope.mOrganizationdata[i].mdepartment[l].mfunction==$scope.FunctionEditdata)
          {
          $scope.mOrganizationdata[i].mdepartment[l].mfunction=$scope.mfunction;
          }
          $scope.changeddata=$scope.mOrganizationdata[i];
       
        }
      }
      console.log(JSON.stringify($scope.changeddata))
      
    mOrgService.updatedata($scope.changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
       $scope.getOrganization();
        $scope.editfunction=1;
        self.searchEntity="";
        self.selectedEntity="";
        self.searchFunction="";
        self.selectedFunction="";
        $scope.mfunction=""; 
     });
     };      
     }
   }
     
   } 
   
 /*active function*/
 $scope.activeFunction=function(data)
 {
   $scope.getid(data);
   $scope.mOrganizationdata= $scope.mOrganization;
   $scope.mOrganizationdata.id=$scope.data_id;
   for(var i=0;i<$scope.mOrganizationdata.length;i++)
   {     
    console.log("data id::"+JSON.stringify($scope.mOrganizationdata[i]._id));
   console.log("id::"+JSON.stringify($scope.data_id))
       if($scope.mOrganizationdata[i]._id == $scope.data_id)
       {
      
      if($scope.mOrganizationdata[i].mfunction)
      {
        for(var k=0;k<$scope.mOrganizationdata[i].mfunction.length;k++)
        {
          if($scope.mOrganizationdata[i].mfunction[k].mfunction==data.mfunction)
        {   
          if($scope.mOrganizationdata[i].mfunction[k].status==1)
          {
             $scope.mOrganizationdata[i].mfunction[k].status=0;
          }
          else{
             $scope.mOrganizationdata[i].mfunction[k].status=1;
          }
         
        }
        }
      }
      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
           if($scope.mOrganizationdata[i].mdepartment[l].mfunction==data.mfunction)
        {  

          if($scope.mOrganizationdata[i].mdepartment[l].status==1)
          {
            $scope.mOrganizationdata[i].mdepartment[l].status=0;
          }
          else
          {
            $scope.mOrganizationdata[i].mdepartment[l].status=1;
          }
          
        }
        }
      }
    }
    $scope.changeddata=$scope.mOrganizationdata[i];
    mOrgService.activedata($scope.changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
      
       $scope.getOrganization();
        
     });
  } 
 }

 /*edit */
 $scope.editFunction=function(data)
 {
   $scope.passgroupdata=data;
   $scope.action_name="Update"
   $scope.editfunction=0;
   $scope.mfunction=data.mfunction; 
   self.selectedEntity=data.mentity;
   self.selectedGroup=data.mgroup;
   $scope.dis_entity=true;
   $scope.dis_group=true;
   $scope.FunctionEditdata=data.mfunction;
 }

 $scope.cancelFunction=function()
{
  $scope.editfunction=1;
  self.searchEntity="";
  self.selectedEntity="";
  self.searchFunction="";
  self.selectedFunction="";
  $scope.mfunction=""; 
  $scope.dis_entity=false;
  $scope.dis_group=true;
  $scope.action_name="Add"
}

$scope.removeFunction=function(data)
{
$scope.getid(data);
$scope.mOrganizationdata= $scope.mOrganization;
   for(var i=0;i<$scope.mOrganizationdata.length;i++)
   {     
      if($scope.mOrganizationdata[i]._id == $scope.data_id)
       {
       console.log(JSON.stringify($scope.mOrganizationdata[i]));
       if($scope.mOrganizationdata[i].mgroup)
     {  
      for(var j=0;j<$scope.mOrganizationdata[i].mgroup.length;j++)
      {   

        if($scope.mOrganizationdata[i].mgroup[j].mgroup==data.mgroup)
        {    
          $scope.mOrganizationdata[i].mgroup.splice(j, 1);
          j--;
            
        };

      }
      $scope.Group_fliterd_data=$scope.mOrganizationdata[i].mgroup;
      }
      if($scope.mOrganizationdata[i].mfunction)
      {
        for(var k=0;k<$scope.mOrganizationdata[i].mfunction.length;k++)
        {
          if($scope.mOrganizationdata[i].mfunction[k].mfunction==data.mfunction)
        {   
         $scope.mOrganizationdata[i].mfunction.splice(k,1);
         k--; 
        };
        }
         $scope.Function_fliterd_data=$scope.mOrganizationdata[i].mfunction;
      }

      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
           if($scope.mOrganizationdata[i].mdepartment[l].mfunction==data.mfunction)
        {  
          $scope.mOrganizationdata[i].mdepartment.splice(l, 1);
          l--;
          
        };
        }
        $scope.Department_fliterd_data=$scope.mOrganizationdata[i].mdepartment;
      }
      var changeddata={};
      changeddata._id=$scope.data_id;
    changeddata.mentity=data.mentity;
    changeddata.mgroup= $scope.Group_fliterd_data;
    changeddata.mfunction= $scope.Function_fliterd_data;
    changeddata.mdepartment= $scope.Department_fliterd_data;
     console.log(JSON.stringify(changeddata))
    mOrgService.removedata(changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
      
       $scope.getOrganization();
        
     });
    }
    
  } 
}

$scope.addDepartment=function(data)
 {  

 if($scope.action_name=="Add")
    { 
        var sendData={};
        sendData.mentity=$scope.selectedEntitydata;
       sendData.mgroup=$scope.selectedGroupdata;
       sendData.mfunction=$scope.selectedFunctiondata;
       sendData.mdepartment=data;
       mOrgService.addDepartment(sendData).then(function(response)
       {
           self.searchEntity="";
            self.selectedEntity="";
            self.selectedGroup="";
            self.searchGroup="";
            self.selectedFunction="";
            self.searchFunction="";
            $scope.mdepartment="";
            console.log("Department::"+JSON.stringify(response));
            $scope.getOrganization();
       });
     }
     else
     {

       $scope.getid($scope.passgroupdata);
       $scope.mOrganizationdata= $scope.mOrganization;
        console.log("Update data"+JSON.stringify($scope.mOrganizationdata));
   // $scope.mOrganization.mentity
   for(var i=0;i<$scope.mOrganizationdata.length;i++)
   {     
    console.log("data id::"+JSON.stringify($scope.mOrganizationdata[i]._id));
    console.log("id::"+JSON.stringify($scope.data_id))
       if($scope.mOrganizationdata[i]._id == $scope.data_id)
       {  
      
      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
           if($scope.mOrganizationdata[i].mdepartment[l].mdepartment==$scope.DepartmentEditdata)
          {
          $scope.mOrganizationdata[i].mdepartment[l].mdepartment=$scope.mdepartment;
          }
          $scope.changeddata=$scope.mOrganizationdata[i];
       
        }
      }
      console.log(JSON.stringify($scope.changeddata))
      
    mOrgService.updatedata($scope.changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
       $scope.getOrganization();
        $scope.editdepartment=1;
        self.searchEntity="";
        self.selectedEntity="";
        self.searchGroup="";
        self.selectedGroup="";
        self.searchFunction="";
        self.selectedFunction="";
        $scope.mdepartment=""; 
        $scope.getOrganization();
     });
     };      
     }
   }
     
   } 
   
 /*active Department*/
 $scope.activeDepartment=function(data)
 {
   $scope.getid(data);
   $scope.mOrganizationdata= $scope.mOrganization;
   $scope.mOrganizationdata.id=$scope.data_id;
   for(var i=0;i<$scope.mOrganizationdata.length;i++)
   {     
    console.log("data id::"+JSON.stringify($scope.mOrganizationdata[i]._id));
   console.log("id::"+JSON.stringify($scope.data_id))
       if($scope.mOrganizationdata[i]._id == $scope.data_id)
       {
      
      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
           if($scope.mOrganizationdata[i].mdepartment[l].mdepartment==data.mdepartment)
        {  

          if($scope.mOrganizationdata[i].mdepartment[l].status==1)
          {
            $scope.mOrganizationdata[i].mdepartment[l].status=0;
          }
          else
          {
            $scope.mOrganizationdata[i].mdepartment[l].status=1;
          }
          
        }
        }
      }
    }
    $scope.changeddata=$scope.mOrganizationdata[i];
    mOrgService.activedata($scope.changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
      
       $scope.getOrganization();
        
     });
  } 
 }

 /*edit */
 $scope.editDepartment=function(data)
 {
   $scope.passgroupdata=data;
   $scope.action_name="Update"
   $scope.editdepartment=0;
   $scope.mdepartment=data.mdepartment; 
   self.selectedEntity=data.mentity;
   self.selectedGroup=data.mgroup;
   self.selectedFunction=data.mfunction;
   $scope.dis_entity=true;
   $scope.dis_group=true;
   $scope.dis_function=true;
   $scope.DepartmentEditdata=data.mdepartment;
 }

 $scope.cancelDepartment=function()
{
  $scope.editdepartment=1;
  self.searchEntity="";
  self.selectedEntity="";
  self.searchGroup="";
  self.selectedGroup="";
  self.searchFunction="";
  self.selectedFunction="";
  $scope.mdepartment=""; 
  $scope.dis_entity=false;
  $scope.dis_group=true;
  $scope.dis_function=true;
  $scope.action_name="Add"
}

$scope.removeDepartment=function(data)
{
$scope.getid(data);
$scope.mOrganizationdata= $scope.mOrganization;
   for(var i=0;i<$scope.mOrganizationdata.length;i++)
   {     
      if($scope.mOrganizationdata[i]._id == $scope.data_id)
       {
       console.log(JSON.stringify($scope.mOrganizationdata[i]));
       if($scope.mOrganizationdata[i].mgroup)
     {  
      $scope.Group_fliterd_data=$scope.mOrganizationdata[i].mgroup;
      }
      if($scope.mOrganizationdata[i].mfunction)
      {
         $scope.Function_fliterd_data=$scope.mOrganizationdata[i].mfunction;
      }

      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
           if($scope.mOrganizationdata[i].mdepartment[l].mdepartment==data.mdepartment)
        {  
          $scope.mOrganizationdata[i].mdepartment.splice(l, 1);
          l--;
          
        };
        }
        $scope.Department_fliterd_data=$scope.mOrganizationdata[i].mdepartment;
      }
      var changeddata={};
      changeddata._id=$scope.data_id;
    changeddata.mentity=data.mentity;
    changeddata.mgroup= $scope.Group_fliterd_data;
    changeddata.mfunction= $scope.Function_fliterd_data;
    changeddata.mdepartment= $scope.Department_fliterd_data;
     console.log(JSON.stringify(changeddata))
    mOrgService.removedata(changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
      
       $scope.getOrganization();
        
     });
    }
    
  } 
}

/*$scope.changeActiveStatus=function(activestatus)
{ 
   if(activestatus==1)
  {
     $scope.getAllOrganizationdata();
  }
  else
  { 
       $scope.getOrganization();
  }
  
}
$scope.getAllOrganizationdata=function()
{
  mOrgService.getAllOrganization().then(function(response) {
    if(response)
    {
   $scope.mOrganization=response.data;
    // $scope.mOrganizationdata= $scope.mOrganization;
    // $scope.contentdata();
    OrganizationResponse=response.data;
    $scope.getEntitydata(response.data);
    $scope.contentdata(response.data)
     }  
    console.log("OrganizationResponse::"+JSON.stringify(OrganizationResponse));
    });
}*/

});
