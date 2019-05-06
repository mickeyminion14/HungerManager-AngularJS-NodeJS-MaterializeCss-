angular.module("BookMealCtrl",[])
.controller("BookMealController", function ($rootScope, $http, $scope, $location, $window, $localStorage){
    console.log("bookmeal ctrl");
    $rootScope.User_Hunger_Manager;
    $rootScope.NavBarVisibilty = "true";
    $rootScope.MobileNavBarVisibilty = "true";  
    $rootScope.loggedIn_Hunger_Manager = $localStorage.loggedIn_Hunger_Manager || 'false';
    //  if($rootScope.loggedIn=="true") {}
    $rootScope.qrCode = $localStorage.qrCode || "false";
    $rootScope.locationQr = $localStorage.locationQr || null ;
    $rootScope.User_Hunger_Manager = $localStorage.User_Hunger_Manager || null;



    $scope.bookmeal = () => {
        let d = new Date();
        $scope.unique_id = $localStorage.User_Hunger_Manager.rollno+"Lunch"+ d.getDate() + d.getMonth() + d.getFullYear()  ;
        console.log($scope.unique_id);
        $scope.reqData = {unique_id : $scope.unique_id};
        $("#subBtn").removeClass("scale-in");
        $('#subBtn').addClass("scale-out");
        $('#loader').css("visibility", "visible");
        $http.post('/bookmeal', $scope.reqData)
        .success(function (data) {

           if(data.found == false) {
                let locationQrCode = data.locationQr.substr(6);
               
               console.log(locationQrCode);
               $localStorage.qrCode = "true";
               $localStorage.locationQr = locationQrCode;
               $location.path("/profile");
           }
           else {
            $localStorage.qrCode = "false";
            $('#subBtn').removeClass("scale-out");
            $('#subBtn').addClass("scale-in");
            $('#loader').css("visibility", "hidden");
            M.toast({
              html: 'Meal has been booked already ',
              displayLength: 3000
            })
           }
        //  $location.path("/profile");
        
        })
        
        .error(function (data) {
         
            console.log('Error: ' + data);
          
          });
        
    
    }
});